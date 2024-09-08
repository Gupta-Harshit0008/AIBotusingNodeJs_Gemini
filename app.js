const expess=require('express');
const morgon=require('morgan')
const {Telegraf}=require('telegraf')
const dotenv=require('dotenv');
const { message } = require("telegraf/filters");

dotenv.config({path:'./config.env'})
const bot= new Telegraf(process.env.TELEGRAM_BOT_API_KEY);
const GeminiAI=require('./utils/GeminiUtil')

const app=expess();
app.use(expess.json());
app.use(morgon('dev'))


bot.start( async (ctx)=>{
    await ctx.reply('Hii welcome to my Bot. Please enter your question will try to answer it')
})

bot.on(message('text'), async(ctx)=>{
    try{
        const promt=ctx.message.text
        const result=await GeminiAI.run(promt)
     
        ctx.reply(result)
    }
    catch{
        ctx.reply('Facing some difficulties pls try again later')
    }
    
})

bot.launch();


app.get('/',(req,res)=>{
    res.send('Hiii ')
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))  

module.exports=app;