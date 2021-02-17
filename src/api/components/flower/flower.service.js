
const GenericModelService = require('../../../services/genericModelService.util');
const FlowerModel = require('./flower.model');
const axios = require('axios');
const cheerio = require('cheerio');
const {CSS_COLORS} = require('../../../config/global.constant');

const flowerService = GenericModelService(FlowerModel);

const URL_TO_SCRAPE = 'https://www.proflowers.com/blog/types-of-flowers';
flowerService.scrapeFlowers = async () => {
    const {data:htmlToPars} = await axios.get(URL_TO_SCRAPE);
    const $ = cheerio.load(htmlToPars);

    $('.row .flower').each(async (index, element) => {
        const flowerName = $(element).find('.flower_name').text();
        const flowerImageUrl = $(element).find('img').attr('data-src');
        const flowerDescription = $(element).find('figcaption').text().substring(0,250);
        const colors = CSS_COLORS.filter( color => flowerDescription.includes(color));
        
        try{
            if(await FlowerModel.findOne({flowerName})) return;
            
            if(colors.length === 0){
                flowerService.addItem({ flowerName, flowerDescription, flowerImageUrl, flowerColor: 'white' });
            } else {
                for( const flowerColor of colors)
                   flowerService.addItem({ flowerName, flowerDescription, flowerImageUrl, flowerColor });
            }
        } catch(err) {console.log(err);}
    });
};

module.exports = flowerService;