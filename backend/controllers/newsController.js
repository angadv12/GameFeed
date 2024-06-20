const getSportsNews = async (req, res) => {
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${process.env.NEWS_API_KEY}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching sports news' });
    }
};

module.exports = { getSportsNews };
