// api/chat.js
// Proxy route — hides the Anthropic API key and enables web search
// for live clinical guideline retrieval.

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  try {
    const body = { ...req.body };

    // Add web search tool to all chat requests (not document analysis)
    if (!body.tools && !body._skipSearch) {
      body.tools = [
        {
          type: 'web_search_20250305',
          name: 'web_search',
          allowed_domains: [
            'pubmed.ncbi.nlm.nih.gov',
            'www.ncbi.nlm.nih.gov',
            'www.cochranelibrary.com',
            'www.nice.org.uk',
            'www.who.int',
            'www.heart.org',
            'www.acc.org',
            'www.diabetes.org',
            'www.uptodate.com',
            'www.mayoclinic.org',
            'www.nejm.org',
            'www.thelancet.com',
            'jamanetwork.com',
            'www.bmj.com',
            'www.ahajournals.org',
            'www.aafp.org',
            'www.endocrine.org',
            'www.kidney.org',
          ],
        },
      ];
    }

    delete body._skipSearch;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    // Merge all text blocks into one convenient field
    const mergedText = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n');

    return res.status(200).json({ ...data, mergedText });

  } catch (error) {
    return res.status(500).json({ error: 'Server error — please try again' });
  }
}
