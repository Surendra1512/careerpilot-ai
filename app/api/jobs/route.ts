import { NextRequest, NextResponse } from 'next/server';

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;

export interface NormalizedOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salaryMin?: number;
  salaryMax?: number;
  url: string;
  createdAt: string;
  source: 'adzuna' | 'demo';
  opportunityType: 'Job' | 'Internship' | 'Opportunity';
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword') || searchParams.get('q') || '';
    const location = searchParams.get('location') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const resultsPerPage = parseInt(searchParams.get('resultsPerPage') || '10', 10);
    const filterType = (searchParams.get('type') || 'all').toLowerCase(); // 'job', 'internship', 'all'
    const country = resolveCountry(searchParams.get('country') || location);

    // If credentials are not present, return clearly labeled demo data
    if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY) {
      const demoData = generateDemoOpportunities(keyword, location, filterType);
      return NextResponse.json({
        jobs: demoData,
        total: demoData.length,
        page,
        resultsPerPage,
        source: 'demo',
        isLive: false,
        message: 'Adzuna API credentials not configured. Displaying verified demo opportunities.'
      });
    }

    // Call live Adzuna API
    const liveResults = await fetchFromAdzuna(keyword, location, country, page, resultsPerPage, filterType);

    if (!liveResults || liveResults.length === 0) {
      // Return empty or fallback with clear explanation
      return NextResponse.json({
        jobs: [],
        total: 0,
        page,
        resultsPerPage,
        source: 'adzuna',
        isLive: true,
        message: `No active Adzuna listings found matching "${keyword}" in "${location || country}".`
      });
    }

    const normalized = liveResults.map(normalizeAdzunaJob);
    // Filter by type if requested
    const filtered = filterType === 'internship'
      ? normalized.filter(item => item.opportunityType === 'Internship')
      : filterType === 'job'
      ? normalized.filter(item => item.opportunityType === 'Job')
      : normalized;

    return NextResponse.json({
      jobs: filtered,
      total: filtered.length,
      page,
      resultsPerPage,
      source: 'adzuna',
      isLive: true,
      country
    });

  } catch (error: any) {
    console.error('Jobs API Route Error:', error?.message || error);
    const demoFallback = generateDemoOpportunities('', '', 'all');
    return NextResponse.json({
      jobs: demoFallback,
      total: demoFallback.length,
      page: 1,
      source: 'demo',
      isLive: false,
      error: 'Failed to retrieve live listings. Showing demo opportunities.'
    });
  }
}

function resolveCountry(locOrCountry: string): string {
  const lower = locOrCountry.toLowerCase().trim();
  if (['in', 'india', 'delhi', 'bangalore', 'bengaluru', 'mumbai', 'pune', 'hyderabad', 'noida', 'chennai'].some(c => lower.includes(c))) {
    return 'in';
  }
  if (['us', 'usa', 'united states', 'california', 'new york', 'remote us', 'seattle', 'texas'].some(c => lower.includes(c))) {
    return 'us';
  }
  if (['gb', 'uk', 'united kingdom', 'london', 'manchester', 'birmingham'].some(c => lower.includes(c))) {
    return 'gb';
  }
  if (['ca', 'canada', 'toronto', 'vancouver'].some(c => lower.includes(c))) {
    return 'ca';
  }
  if (['au', 'australia', 'sydney', 'melbourne'].some(c => lower.includes(c))) {
    return 'au';
  }
  return 'in'; // Default to India as per user profile context
}

async function fetchFromAdzuna(keyword: string, location: string, country: string, page: number, limit: number, filterType: string): Promise<any[]> {
  const searchTerm = filterType === 'internship' && !keyword.toLowerCase().includes('intern')
    ? `${keyword} internship`.trim()
    : keyword || (filterType === 'internship' ? 'internship' : 'software');

  const locParam = location ? `&where=${encodeURIComponent(location)}` : '';
  const whatParam = encodeURIComponent(searchTerm);
  const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=${limit}&what=${whatParam}${locParam}`;

  const response = await fetch(url, {
    headers: { 'Accept': 'application/json' },
    next: { revalidate: 60 } // cache for 60 seconds
  });

  if (!response.ok) {
    console.error(`Adzuna API returned HTTP ${response.status} for ${country}`);
    return [];
  }

  const data = await response.json();
  return Array.isArray(data.results) ? data.results : [];
}

function normalizeAdzunaJob(raw: any): NormalizedOpportunity {
  const title = raw.title?.replace(/<\/?[^>]+(>|$)/g, '') || 'Engineering Opportunity';
  const desc = raw.description?.replace(/<\/?[^>]+(>|$)/g, '') || 'Full details available on employer application portal.';
  const isIntern = /intern|internship|trainee|apprentice/i.test(title) || /intern|internship/i.test(desc);

  return {
    id: String(raw.id || Math.random().toString(36).substring(2, 9)),
    title,
    company: raw.company?.display_name || 'Hiring Organization',
    location: raw.location?.display_name || 'Location Specified on Site',
    description: desc,
    salaryMin: typeof raw.salary_min === 'number' ? Math.round(raw.salary_min) : undefined,
    salaryMax: typeof raw.salary_max === 'number' ? Math.round(raw.salary_max) : undefined,
    url: raw.redirect_url || '#',
    createdAt: raw.created ? new Date(raw.created).toISOString() : new Date().toISOString(),
    source: 'adzuna',
    opportunityType: isIntern ? 'Internship' : 'Job'
  };
}

function generateDemoOpportunities(keyword: string, location: string, filterType: string): NormalizedOpportunity[] {
  const allDemo: NormalizedOpportunity[] = [
    {
      id: 'demo-int-1',
      title: 'AI / Machine Learning Intern',
      company: 'Averixis AI Labs',
      location: 'Bengaluru, India (Hybrid)',
      description: 'Assist in training and evaluating transformer models and building automated data ingestion pipelines in Python.',
      salaryMin: 25000,
      salaryMax: 35000,
      url: 'https://example.com/demo/internship/averixis',
      createdAt: new Date().toISOString(),
      source: 'demo',
      opportunityType: 'Internship'
    },
    {
      id: 'demo-int-2',
      title: 'Data Science Intern',
      company: 'QuantMatrix Solutions',
      location: 'Pune, India (Remote)',
      description: 'Perform exploratory data analysis, build predictive classification models, and assist in stakeholder dashboards.',
      salaryMin: 20000,
      salaryMax: 30000,
      url: 'https://example.com/demo/internship/quantmatrix',
      createdAt: new Date().toISOString(),
      source: 'demo',
      opportunityType: 'Internship'
    },
    {
      id: 'demo-int-3',
      title: 'Software Engineering Intern',
      company: 'CloudPulse Technologies',
      location: 'Hyderabad, India (In-office)',
      description: 'Collaborate with senior developers on building scalable RESTful microservices and writing automated unit tests.',
      salaryMin: 22000,
      salaryMax: 32000,
      url: 'https://example.com/demo/internship/cloudpulse',
      createdAt: new Date().toISOString(),
      source: 'demo',
      opportunityType: 'Internship'
    },
    {
      id: 'demo-int-4',
      title: 'Full Stack Developer Intern',
      company: 'Nexlify Systems',
      location: 'Delhi NCR, India (Hybrid)',
      description: 'Build interactive React user interfaces, optimize API integrations, and maintain PostgreSQL database schemas.',
      salaryMin: 20000,
      salaryMax: 28000,
      url: 'https://example.com/demo/internship/nexlify',
      createdAt: new Date().toISOString(),
      source: 'demo',
      opportunityType: 'Internship'
    },
    {
      id: 'demo-job-1',
      title: 'Junior Machine Learning Engineer',
      company: 'Synthetix AI',
      location: 'Bengaluru, India',
      description: 'Deploy deep learning models into production environments with Docker, monitor inference latency, and optimize pipelines.',
      salaryMin: 650000,
      salaryMax: 950000,
      url: 'https://example.com/demo/job/synthetix',
      createdAt: new Date().toISOString(),
      source: 'demo',
      opportunityType: 'Job'
    },
    {
      id: 'demo-job-2',
      title: 'Associate Data Scientist',
      company: 'Cortex Analytics',
      location: 'Mumbai, India',
      description: 'Formulate hypotheses, build predictive ML models using Scikit-Learn and PyTorch, and deliver data-driven business insights.',
      salaryMin: 600000,
      salaryMax: 850000,
      url: 'https://example.com/demo/job/cortex',
      createdAt: new Date().toISOString(),
      source: 'demo',
      opportunityType: 'Job'
    },
    {
      id: 'demo-job-3',
      title: 'Software Engineer - Backend (Python/Go)',
      company: 'HyperScale Networks',
      location: 'Remote, India',
      description: 'Design and implement distributed backend microservices, maintain high availability, and write scalable database queries.',
      salaryMin: 700000,
      salaryMax: 1100000,
      url: 'https://example.com/demo/job/hyperscale',
      createdAt: new Date().toISOString(),
      source: 'demo',
      opportunityType: 'Job'
    },
    {
      id: 'demo-job-4',
      title: 'Junior Data Analyst',
      company: 'MetricFlow Global',
      location: 'Gurugram, India',
      description: 'Write complex SQL queries, build executive Power BI dashboards, and maintain reliable daily data pipelines.',
      salaryMin: 500000,
      salaryMax: 700000,
      url: 'https://example.com/demo/job/metricflow',
      createdAt: new Date().toISOString(),
      source: 'demo',
      opportunityType: 'Job'
    }
  ];

  return allDemo.filter(item => {
    if (filterType === 'internship' && item.opportunityType !== 'Internship') return false;
    if (filterType === 'job' && item.opportunityType !== 'Job') return false;
    if (keyword && !item.title.toLowerCase().includes(keyword.toLowerCase()) && !item.company.toLowerCase().includes(keyword.toLowerCase())) {
      return false;
    }
    if (location && !item.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    return true;
  });
}
