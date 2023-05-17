import React, {useState} from 'react';
import AsideBar from '../../components/AsideBar';
import axios from 'axios';
import Swal from 'sweetalert2';
const NewStore = () => {
  const [name, setName] = useState ('');
  const [link, setLink] = useState ('');
  const [logo, setLogo] = useState ('');
  const [isModalVisible, setIsModalVisible] = useState (false);

  const URL = 'htttp://localhost:9000/store/create-store';
  const create = () => {
    axios
      .post (URL, {
        name,
        link,
        logo,
      })
      .then (response => {
        console.log (response);
      })
      .catch (error => {
        Swal.fire ({
          position: 'top-end',
          toast: true,
          title: error.response.data.message,
          color: 'red',
          showConfirmButton: false,
          timer: 2500,
        });
        console.log (error);
      });
  };

  return (
    <div className="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
      <AsideBar />
      <main className="ease-soft-in-out xl:ml-68.5 relative h-screen max-h-screen rounded-xl transition-all duration-200">
        <div className="flex justify-center items-center h-screen">
          <button
            type="button"
            data-toggle="modal"
            data-target="#import"
            // onClick={() => setIsModalVisible (true)}
            className="inline-block ml-4 px-6 py-3 mt-6 mb-0 font-bold text-center text-black uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-green-600 to-green-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
            style={{background: '#FF9B00'}}
          >
            Open Modal
          </button>
        </div>
        <div class="w-full mx-auto">
          <div accordion>
            <div accordion-section class="mb-4 rounded-t-1">
              <h5 class="mb-0">
                <button
                  section-trigger
                  class="relative flex items-center w-full p-4 font-semibold text-left transition-all border-b border-solid cursor-pointer border-slate-100 ease-soft-in text-slate-700 rounded-t-1"
                  aria-expanded="true"
                >
                  How do I order?
                  <i
                    section-open-icon
                    class="absolute right-0 hidden pt-1 mr-4 leading-tight fa fa-plus text-xs"
                  />
                  <i
                    section-close-icon
                    class="absolute right-0 pt-1 mr-4 leading-tight fa fa-minus text-xs"
                  />
                </button>
              </h5>
              <div
                section-content
                class="overflow-hidden transition-all ease-soft-in-out duration-350"
              >
                <div class="p-4 leading-normal text-sm opacity-80 ">
                  We’re not always in the position that we want to be at. We’re constantly growing. We’re constantly making mistakes. We’re constantly trying to express ourselves and actualize our dreams. If you have the opportunity to play this game of life you need to appreciate every moment. A lot of people don’t appreciate the moment until it’s passed.
                  {' '}
                </div>
              </div>
            </div>
            <div accordion-section class="mb-4">
              <h5 class="mb-0">
                <button
                  section-trigger
                  class="relative flex items-center w-full p-4 font-semibold text-left transition-all border-b border-solid cursor-pointer border-slate-100 ease-soft-in text-slate-500 rounded-t-1"
                  aria-expanded="false"
                >
                  How can i make the payment?
                  <i
                    section-open-icon
                    class="absolute right-0 pt-1 mr-4 leading-tight fa fa-plus text-xs"
                  />
                  <i
                    section-close-icon
                    class="absolute right-0 hidden pt-1 mr-4 leading-tight fa fa-minus text-xs"
                  />
                </button>
              </h5>
              <div
                section-content
                class="overflow-hidden transition-all ease-soft-in-out duration-350"
              >
                <div class="p-4 leading-normal text-sm opacity-80 ">
                  It really matters and then like it really doesn’t matter. What matters is the people who are sparked by it. And the people who are like offended by it, it doesn’t matter. Because it's about motivating the doers. Because I’m here to follow my dreams and inspire other people to follow their dreams, too.
                  {' '}
                  <br />
                  We’re not always in the position that we want to be at. We’re constantly growing. We’re constantly making mistakes. We’re constantly trying to express ourselves and actualize our dreams. If you have the opportunity to play this game of life you need to appreciate every moment. A lot of people don’t appreciate the moment until it’s passed.
                  {' '}
                </div>
              </div>
            </div>
            <div accordion-section class="mb-4">
              <h5 class="mb-0">
                <button
                  section-trigger
                  class="relative flex items-center w-full p-4 font-semibold text-left transition-all border-b border-solid cursor-pointer border-slate-100 ease-soft-in text-slate-500 rounded-t-1"
                  aria-expanded="false"
                >
                  How much time does it take to receive the order?
                  <i
                    section-open-icon
                    class="absolute right-0 pt-1 mr-4 leading-tight fa fa-plus text-xs"
                  />
                  <i
                    section-close-icon
                    class="absolute right-0 hidden pt-1 mr-4 leading-tight fa fa-minus text-xs"
                  />
                </button>
              </h5>
              <div
                section-content
                class="overflow-hidden transition-all ease-soft-in-out duration-350"
              >
                <div class="p-4 leading-normal text-sm opacity-80 ">
                  The time is now for it to be okay to be great. People in this world shun people for being great. For being a bright color. For standing out. But the time is now to be okay to be the greatest you. Would you believe in what you believe in, if you were the only one who believed it? If everything I did failed - which it doesn't, it actually succeeds - just the fact that I'm willing to fail is an inspiration. People are so scared to lose that they don't even try. Like, one thing people can't say is that I'm not trying, and I'm not trying my hardest, and I'm not trying to do the best way I know how.
                  {' '}
                </div>
              </div>
            </div>
            <div accordion-section class="mb-4">
              <h5 class="mb-0">
                <button
                  section-trigger
                  class="relative flex items-center w-full p-4 font-semibold text-left transition-all border-b border-solid cursor-pointer border-slate-100 ease-soft-in text-slate-500 rounded-t-1"
                  aria-expanded="false"
                >
                  Can I resell the products?
                  <i
                    section-open-icon
                    class="absolute right-0 pt-1 mr-4 leading-tight fa fa-plus text-xs"
                  />
                  <i
                    section-close-icon
                    class="absolute right-0 hidden pt-1 mr-4 leading-tight fa fa-minus text-xs"
                  />
                </button>
              </h5>
              <div
                section-content
                class="overflow-hidden transition-all ease-soft-in-out duration-350"
              >
                <div class="p-4 leading-normal text-sm opacity-80 ">
                  I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can’t do anything, you won’t do anything. I was taught I could do everything.
                  {' '}
                  <br />
                  <br />
                  If everything I did failed - which it doesn't, it actually succeeds - just the fact that I'm willing to fail is an inspiration. People are so scared to lose that they don't even try. Like, one thing people can't say is that I'm not trying, and I'm not trying my hardest, and I'm not trying to do the best way I know how.
                  {' '}
                </div>
              </div>
            </div>
            <div accordion-section class="mb-4 rounded-b-1">
              <h5 class="mb-0">
                <button
                  section-trigger
                  class="relative flex items-center w-full p-4 font-semibold text-left transition-all border-b border-solid cursor-pointer border-slate-100 ease-soft-in text-slate-500 rounded-t-1"
                  aria-expanded="false"
                >
                  Where do I find the shipping details?
                  <i
                    section-open-icon
                    class="absolute right-0 pt-1 mr-4 leading-tight fa fa-plus text-xs"
                  />
                  <i
                    section-close-icon
                    class="absolute right-0 hidden pt-1 mr-4 leading-tight fa fa-minus text-xs"
                  />
                </button>
              </h5>
              <div
                section-content
                class="overflow-hidden transition-all ease-soft-in-out duration-350"
              >
                <div class="p-4 leading-normal text-sm opacity-80 ">
                  There’s nothing I really wanted to do in life that I wasn’t able to get good at. That’s my skill. I’m not really specifically talented at anything except for the ability to learn. That’s what I do. That’s what I’m here for. Don’t be afraid to be wrong because you can’t learn anything from a compliment. I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can’t do anything, you won’t do anything. I was taught I could do everything.
                  {' '}
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default NewStore;
