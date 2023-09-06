import React, { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { loader } from "../assets";

import { toast } from 'react-hot-toast';
import DropdownMenuWithSelectedValue from '../components/DropDown';
import axios, { all } from 'axios'
import { languages } from '../utils';
import { FiLink2 } from 'react-icons/fi';
import { FiCopy } from 'react-icons/fi';
import { TiTick } from 'react-icons/ti';
import { AiOutlineDelete } from 'react-icons/ai';
const Summarize = () => {

    const [article, setArticle] = useState({
      data: "",
      summary: "",
      language: ""
    });
    console.log("Article at start is", article)
    const [allArticles, setAllArticles] = useState([]);
    const [copied, setCopied] = useState("");
    const [action, setAction] = useState("");
    
    const [lang, setLang] = useState("")
    console.log("Language code at start is", lang)
    const [loading, setLoading] = useState(false)
    const [textareaStyle, setTextareaStyle] = useState({
      height: 'auto',
      overflowY: 'hidden',
    });
    console.log("Text area style is", textareaStyle)
    
    const actions = ['Summarize', 'Summarize And Translate', 'Translate']
    
    const RAPID_API = process.env.REACT_APP_RAPID_API_KEY
    // console.log("Rapid api key", RAPID_API, typeof(RAPID_API))
    
    useEffect(() => {
      const articlesFromLocalStorage = JSON.parse(
        localStorage.getItem("articles")
      );

      if (articlesFromLocalStorage) {
        setAllArticles(articlesFromLocalStorage)
      }
    
      
    }, [])

    
    const handleDelete = (item)=> {
      console.log("item in delete is", item)
        const newArticles = allArticles.filter((article)=> {
          if (article.language == "") {
            return item.data !== article.data
          }
          else{
            return (item.data !== article.data) || (item.language !== article.language)
          }
        })
        console.log("newArticles after deletion", newArticles)
        setArticle( {
          data: "",
          summary: "",
          language: ""
        });
        setAllArticles(newArticles)
        localStorage.setItem("articles", JSON.stringify(newArticles));
        // let textarea = document.getElementById("myTextarea");
        // textarea.style.height = "auto";
        // textarea.style.height = textarea.scrollHeight + "px";
        setTextareaStyle({
          height: "fit-content"
        })
    }
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}([-a-zA-Z0-9@:%_\+.~#?&//=]*)?$/;

    const summarizeFromUrl = async (urlInput)=> {
      // Article Extractor and Summarizer
      setLoading(true)
      const options = {
        method: 'GET',
        url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
        params: {
          url: urlInput ,
          length: '3'
        },
        headers: {
          'X-RapidAPI-Key': RAPID_API,
          'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        console.log("summarizeFromUrl response.data", response.data);
        setLoading(false)
        return response.data
      } catch (error) {
        console.error(error);
        toast.error("Error while summarizing from URL")
        setLoading(false)
      }
    }

    const summarizeAndTranslateFromUrl = async (urlInput, target)=> {
       // Article Extractor and Summarizer
       setLoading(true)
       const options = {
        method: 'GET',
        url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
        params: {
          url: urlInput ,
          length: '3',
          lang: target
        },
        headers: {
          'X-RapidAPI-Key': RAPID_API,
          'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        console.log("summarizeAndTranslateFromUrl response.data", response.data);
        setLoading(false)
        return response.data
      } catch (error) {
        console.error(error);
        toast.error("Error while summarizing & translating from URL")
        setLoading(false)
      }
       
    }

    const summarizeFromText = async (text)=> {
      //Text Summarize Pro
      setLoading(true)
      console.log("summarizeFromText text is",text)
      const encodedParams = new URLSearchParams();
      encodedParams.set('text', text);
      encodedParams.set('percentage', '40');

      const options = {
        method: 'POST',
        url: 'https://text-summarize-pro.p.rapidapi.com/summarizeFromText',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': RAPID_API,
          'X-RapidAPI-Host': 'text-summarize-pro.p.rapidapi.com'
        },
        data: encodedParams,
      };

      try {
        const response = await axios.request(options);
        console.log("response.data summarizeFromText is", response.data);
        setLoading(false)
        return response.data
      } catch (error) {
        console.error(error);
        toast.error("Error while summarizing from text")
        setLoading(false)
      }
    }
    const summarizeAndTranslateFromText = async (text, target)=> {
    //Summarize: Text Summarize Pro 
    //Translate: Microsoft Translator Text
      setLoading(true)
      console.log("summarizeAndTranslateFromText text, target is", text, target)
      const summarizedText = await summarizeFromText(text)
      console.log("Summarized Text is",typeof(summarizedText.summary), summarizedText.summary)

      const options = {
        method: 'POST',
        url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'c9fb3c3e32mshd163e9a65ed84e3p12816djsn7c9c6d8a7260',
          'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
        },
        data: {
          q: summarizedText.summary,
          source: 'en',
          target: target
        }
      };
      
      try {
        const response = await axios.request(options);
        console.log("summarizeAndTranslateFromText response.data", response);
        setLoading(false)
        return response.data
      } catch (error) {
        console.error(error);
        toast.error("Error while summarizing & translating from text")
        setLoading(false)
      }

    }

    const translateText = async (text, target) => {
      setLoading(true)
      console.log("translateText text, target is", text, target)
      console.log("Type of text, target", typeof(text), typeof(target))
      //Microsoft Translator Text
      const options = {
        method: 'POST',
        url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'c9fb3c3e32mshd163e9a65ed84e3p12816djsn7c9c6d8a7260',
          'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
        },
        data: {
          q: text,
          source: 'en',
          target: target
        }
      };
      try {

        const response = await axios.request(options);
        console.log("TranslateFromText response.data", response);
        setLoading(false)
        return response.data
      } catch (error) {
        console.error(error);
        toast.error("Error while summarizing & translating from text")
        setLoading(false)
      }
    }
   
    const handleInput = (e) => {
      const target = e.target;
  
      target.style.height = 'auto';
      target.style.height = `${target.scrollHeight}px`;
  
      setTextareaStyle({
        height: `${target.scrollHeight}px`,
        overflowY: 'hidden',
      });
      setArticle({ ...article, data: e.target.value })
    };

    const handleSubmit = async (e)=> {
      e.preventDefault();
      console.log("In handle submit", article, lang)
      if ((action == "Summarize And Translate" || action=="Translate") && !lang) {
        toast.error("Select a language as target for translation")
        return
      }
      if (!article.data || !action) {
        toast.error("Enter the input and select an action")
        return
      }

      const existingArticle = allArticles.find((item) => {
        if (article.language == "") {
          return item.data === article.data
        }
        else{
          return (item.data === article.data) && (item.language === article.language)
        }
      })
      console.log("Existing article is", existingArticle)
      if (existingArticle) {
        return setArticle(existingArticle)
      }

      const isURL = urlRegex.test(article.data);
      if (action == "Summarize") {
        
        if (isURL) {
          const response = await summarizeFromUrl(article.data);
          if (response) {
            const newArticle = {...article, summary: response.summary};
            const updatedAllArticles = [newArticle, ...allArticles];
            setArticle(newArticle)
            setAllArticles(updatedAllArticles);
            localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
          }
        }

        else if (!isURL) {
          const response = await summarizeFromText(article.data);
          if (response) {
            const newArticle = {...article, summary: response.summary};
            const updatedAllArticles = [newArticle, ...allArticles];
            setArticle(newArticle)
            setAllArticles(updatedAllArticles);
            localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
          }
        }

      }
      else if (action == "Summarize And Translate") {
        
        if (isURL) {
          const response = await summarizeAndTranslateFromUrl(article.data,lang);
          if (response) {
            const newArticle = {...article, summary: response.summary};
            const updatedAllArticles = [newArticle, ...allArticles];
            setArticle(newArticle)
            setAllArticles(updatedAllArticles);
            localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
          }
        }
        else if (!isURL) {
          const response = await summarizeAndTranslateFromText(article.data,lang);
          if (response) {
            const newArticle = {...article, summary: response.data.translations.translatedText};
            const updatedAllArticles = [newArticle, ...allArticles];
            setArticle(newArticle)
            setAllArticles(updatedAllArticles);
            localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
          }
        }
      }
      else if (action == "Translate" && !isURL) {
        const response = await translateText(article.data,lang);
          if (response) {
            const newArticle = {...article, summary: response.data.translations.translatedText};
            const updatedAllArticles = [newArticle, ...allArticles];
            setArticle(newArticle)
            setAllArticles(updatedAllArticles);
            localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
          }
      }
      else if (action == "Translate" && isURL) {
        toast.error("A url can't be translated enter text")
        return
      }
      console.log("Article after handle submit is", article)
    }

     // copy the url and toggle the icon for user feedback
    const handleCopy = (copyUrl) => {
      setCopied(copyUrl);
      navigator.clipboard.writeText(copyUrl);
      setTimeout(() => setCopied(false), 3000);
    };

    const handleKeyDown = (e) => {
      if (e.keyCode === 13) {
        handleSubmit(e);
      }
    };

    
  return (
    <>
      <header className='w-full flex justify-center items-center flex-col'>
      <h1 className='head_text'>
        Summarize, Translate Articles with <br className='max-md:hidden' />
        <span className='orange_gradient '>Artificial Intelligence</span>
      </h1>
      <h2 className='desc'>
        Simplify your reading with Summize, an open-source article summarizer and translater
        that transforms lengthy articles into clear and concise summaries and translates it if you wish.
      </h2>
      </header>

      <section className='mt-16 w-full max-w-2xl'>
      {/* Search */}
      <div className='flex flex-col w-full gap-2'>
        <form
          className='relative flex flex-col justify-center items-center'
          onSubmit={handleSubmit}
        >
          <div className='w-full relative group'>
            {/* <img
                src={linkIcon}
                alt='link-icon'
                className=''
              /> */}
              
              <i className='hover:border-gray-700 hover:text-gray-700 absolute 
                inset-y-0 left-2 my-1.5 mr-1.5 flex w-10 items-center justify-center
                 rounded border border-gray-200 font-sans text-sm font-medium
                  text-gray-400 group-focus-within:border-gray-700
                 group-focus-within:text-gray-700'>
                <FiLink2 />
              </i>
              
              

              
              {/* <textarea
                    id="myTextarea"
                    placeholder={action == "Translate" ? `Enter the text to be translated` : `Enter the link or text`}
                    style={textareaStyle}
                    value={article.data}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    required
                    className='block w-full rounded-md border border-gray-200 bg-white 
                    py-2.5 pl-14 pr-12 text-sm shadow-lg resize-none 
                    font-satoshi font-medium focus:border-black focus:outline-none 
                    focus:ring-0 peer'
                  /> */}

              <TextareaAutosize
                minRows={1}
                placeholder={action == "Translate" ? `Enter the text to be translated` : `Enter the link or text`}
                value={article.data}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                rows={1}
                required
                className='block w-full rounded-md border border-gray-200 bg-white 
                py-2.5 pl-14 pr-12 text-sm shadow-lg resize-none overflow-y-hidden
                font-satoshi font-medium focus:border-black focus:outline-none 
                focus:ring-0 peer'
              />

              <button
                type='submit'
                className='hover:border-gray-700 hover:text-gray-700 absolute 
                inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center
                 rounded border border-gray-200 font-sans text-sm font-medium
                  text-gray-400 group-focus-within:border-gray-700
                 group-focus-within:text-gray-700 '
              >
                <p>↵</p>
              </button>
          </div>
          
          
        </form>
        <div className='flex justify-between w-[95%] mx-auto mt-10'>

              <DropdownMenuWithSelectedValue
                data={actions}
                selectedItem={action}
                setSelectedItem={setAction}
              />

              {/* Languages array is pending */}
              {
                (action == "Summarize And Translate" || action=="Translate") && (<DropdownMenuWithSelectedValue
                data={languages}
                selectedItem={lang}
                setSelectedItem={setLang}
                article={article}
                setArticle={setArticle}
                allArticles={allArticles}
                setAllArticles={setAllArticles}
                isLanguageArray
              />)
              }
              

        </div>
        {/* Browse History */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.reverse().map((item, index) => (
            <div key={`link-${index}`} className=' relative'>
            <div
              onClick={() => {setArticle(item)
              setLang(item.language)
              }}
              className='p-3 flex justify-start items-center flex-row bg-white border border-gray-200 gap-3 rounded-lg cursor-pointer pr-10'
            >
                <div className='copy_btn' onClick={() => handleCopy(item.data)}>

                  {
                    copied === item.data ? (
                      <i className='w-[40%] h-[40%] object-contain'>
                      <TiTick/>
                      </i>
                    ) : (
                      <i className='w-[40%] h-[40%] object-contain'>
                      <FiCopy/>
                      </i>
                    )
                  }
                </div>
                <p 
                className= {`flex-1 font-satoshi ${urlRegex.test(item.data) ? "text-blue-700" : "text-black"}  font-medium text-sm truncate`}>
                  {item.data}
                </p>    
            </div>

              <div className='w-7 h-7 rounded-full bg-red-100 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] 
                backdrop-blur flex justify-center items-center cursor-pointer absolute top-1/4 right-2.5 ' 
                onClick={()=> {handleDelete(item)}}>
                  <i className=' text-red-700'> <AiOutlineDelete/></i>
                </div>
            </div>     
          ))}
        </div>
      </div>

      {/* Display Result */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {loading ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>
                {
                  action == "Summarize And Translate" ? "Summary and Translation" : ""
                }
                {
                  action == "Summarize" ? "Summary" : ""
                }
                {
                  action == "Translate" ? "Translation" : ""
                }
                </span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
    </>
  )
}

export default Summarize