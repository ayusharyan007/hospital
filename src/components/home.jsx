import React, { Component, useState, useRef, useEffect } from 'react';
import './style.css'
import Navbar from './navbar';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineInstagram, AiOutlineWhatsApp, AiOutlineFacebook, AiOutlineClose, AiOutlineDownCircle } from 'react-icons/ai';
import { FaRandom } from 'react-icons/fa';
import { ImLocation } from 'react-icons/im';
import { PiPaperPlaneTiltLight } from 'react-icons/pi';
import { IoCallOutline } from 'react-icons/io5';
import { BsSunrise, BsSun, BsSunset, BsChevronBarExpand } from 'react-icons/bs';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { BiSolidChevronLeft, BiSolidChevronRight } from 'react-icons/bi';
import { TiTick } from 'react-icons/ti'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import image1 from './Resources/proffessionals/doc1.jpg';
import image2 from './Resources/proffessionals/doc2.jpg';
import image3 from './Resources/proffessionals/doc3new.jpg';
import image4 from './Resources/proffessionals/doc-4new.jpg';
import image5 from './Resources/proffessionals/doc5new.jpg';
import image6 from './Resources/proffessionals/doc6new.jpg';
import image7 from './Resources/proffessionals/doc7new.jpg';
import image8 from './Resources/proffessionals/doc-8new.jpg';
import image9 from './Resources/proffessionals/doc9-new.jpg';
import image10 from './Resources/proffessionals/doc10new.jpg';
import image11 from './Resources/proffessionals/Yvonne-Brown-Colorist.jpg';
import partner1 from './Resources/svg-images/partner1.jpeg';
import partner2 from './Resources/svg-images/partner2.avif';
import partner3 from './Resources/svg-images/partner3.avif';
import partner4 from './Resources/svg-images/partner4.avif';
import axios from 'axios';


const HomePage = () => {

    //Requests

    const [response, setResponse] = useState('');
    const [token, setToken] = useState(null);
    const [tokenKey, setTokenKey] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [isUser, setIsUser] = useState(false);
    const [OTP, SetOpt] = useState('');

    const postData = {
        phone: phoneNumber,
    };

    let verifyData = {
        phone: '',
        otp: '',
    };

    const handleOtpRequest = () => {
        axios.post('https://thorfinn.pythonanywhere.com/api/v1/generate/', postData)
            .then((response) => {
                setResponse(response.data);

                // After getting the OTP, make another request to verify and obtain the token
                verifyData = {
                    phone: postData.phone,
                    otp: String(response.data.generated_otp),
                };

                alert(response.data.generated_otp);

            })
            .catch((error) => {
                console.error('POST request error:', error);
            });
    };

    const handleVerifyRequest = () => {

        axios.post('https://thorfinn.pythonanywhere.com/api/v1/verify/', verifyData)
            .then((response) => {
                // Assuming the token is in response.data.token, you can set it in state or use it as needed.
                if (response.data.token != null) {
                    setToken(true);
                    setTokenKey(response.data.token);
                    console.log("just set the token to true ");
                }

                console.log("the token is " + response.data.token);


            })
            .catch((error) => {
                setToken(false);
                console.log("just set the token to false");
                console.error('Verify request error:', error);
            });
    }

    //Login 

    useEffect(() => {
        if (token === true) {
            alert("Login Sucessfull!!");
            setIsUser(true);

            const parentDiv = document.getElementById('parent-div');
            const loginContainer = parentDiv.querySelector('.login-container');
            if (loginContainer) {
                parentDiv.removeChild(loginContainer);
                handleMinimizeOrder();
            }
        } else if (token === false) {
            alert("Failed to login...");
        }
    }, [token]);

    const handleLoginClick = (OTP) => {
        alert("it must open!!...")
        const parentDiv = document.getElementById('parent-div');

        // Create the container div
        const loginContainer = document.createElement('div');
        loginContainer.classList.add('login-container');

        // Create the input field for mobile number
        const mobileInput = document.createElement('input');
        mobileInput.type = 'tel';
        mobileInput.placeholder = 'Enter Mobile Number';
        mobileInput.classList.add('login-input');

        //Create the input field for OTP
        const otpInput = document.createElement('input');
        otpInput.type = 'number';
        otpInput.placeholder = "Enter OTP...";
        otpInput.classList.add('login-input');

        // Create the "Send OTP" button
        const sendOTPButton = document.createElement('button');
        sendOTPButton.textContent = 'Send OTP';
        sendOTPButton.classList.add('send-otp-button');

        //Create the "Verify OTP" button
        const verifyOTPButton = document.createElement('button');
        verifyOTPButton.textContent = "Enter OTP...";
        verifyOTPButton.classList.add('send-otp-button');

        //Create the "Change Number" button
        const changeNumberButton = document.createElement('button');
        changeNumberButton.textContent = "Change Number";
        changeNumberButton.classList.add('send-otp-button');
        changeNumberButton.classList.add('change-number');

        // Append elements to the container
        loginContainer.appendChild(mobileInput);
        loginContainer.appendChild(sendOTPButton);
        parentDiv.appendChild(loginContainer);

        // Add an event listener to the "Send OTP" button
        sendOTPButton.addEventListener('click', () => {
            const enteredPhoneNumber = String(mobileInput.value);

            if (/^\d{10}$/.test(enteredPhoneNumber)) {
                setPhoneNumber(enteredPhoneNumber);


                postData.phone = enteredPhoneNumber; // Update postData

                handleOtpRequest();

                // Remove the "Send OTP" button
                loginContainer.removeChild(sendOTPButton);
                loginContainer.removeChild(mobileInput);

                loginContainer.appendChild(otpInput);
                loginContainer.appendChild(verifyOTPButton);

                loginContainer.appendChild(changeNumberButton);
            }

        });

        verifyOTPButton.addEventListener('click', () => {
            handleVerifyRequest();
        });

        changeNumberButton.addEventListener('click', () => {

            //Add both previous button and inputfield
            loginContainer.appendChild(mobileInput);
            loginContainer.appendChild(sendOTPButton);

            //remove cuttent button and inputfield
            loginContainer.removeChild(changeNumberButton);

            loginContainer.removeChild(otpInput);
            loginContainer.removeChild(verifyOTPButton);
        });


    };




    const handleOnDragStart = (e) => e.preventDefault();


    const [selectedItem, setSelectedItem] = useState(0);

    const handleItemClick = (index) => {
        setSelectedItem(index);
        setIsExpanded(!isExpanded);
    };

    const [professionals, setProfessionals] = useState([]);

    useEffect(() => {
        // Initialize with default professionals
        const defaultProfessionals = [
            { name: 'Professional 1', image: image1 },
            { name: 'Professional 2', image: image2 },
            { name: 'Professional 3', image: image3 },
            { name: 'Professional 4', image: image4 },
            { name: 'Professional 5', image: image5 },
            { name: 'Professional 6', image: image6 },
            { name: 'Professional 7', image: image7 },
        ];

        setProfessionals(defaultProfessionals);

        // // Fetch additional professionals from the backend API and append to the state
        // fetch('/api/professionals')
        //     .then(response => response.json())
        //     .then(data => {
        //         // Append the fetched professionals to the existing state
        //         setProfessionals(prevProfessionals => [...prevProfessionals, ...data]);
        //     })
        //     .catch(error => console.error('Error fetching data:', error));
    }, []);


    const defaultServiceData = [
        {
            title: 'Neurology', content:
                <>
                    <div className='service-card-1' >
                        Brain Surgery
                        $10
                    </div>

                    <div className='service-card-1'  >
                        Concussion Checkup
                        $5
                    </div>
                    <div className='service-card-1'>
                        Mengitis Checkup
                        $20
                    </div>
                </>

        },
        {
            title: 'Cardiologist', content:
                <>
                    <div className='service-card-1'>
                        Cholestrol Checkup
                        $65
                    </div>
                    <div className='service-card-1'>
                        Heary Bypass Surgery
                        $35
                    </div>

                    <div className='service-card-1'>
                        Heart Attack checkup
                        $45
                    </div>

                    <div className='service-card-1'>
                        Heart Pacemeter
                        $40
                    </div>


                </>
        },
        {
            title: 'Gyncologist', content:
                <>
                    <div className='service-card-1'>
                        Baby Delivery
                        $15
                    </div>

                    <div className='service-card-1'>
                        Overall Checkup
                        $20
                    </div>

                    <div className='service-card-1'>
                        Consultation
                        $30
                    </div>

                    <div className='service-card-1'>
                        Baby Checkup
                        $40
                    </div>


                </>
        },
        {
            title: 'Dermatologist',
            content:
                <>
                    <div class='service-card-1'>
                        Skin Checkup
                        $50
                    </div>

                    <div class='service-card-1'>
                        Old Person Checkup
                        $55
                    </div>

                    <div class='service-card-1'>
                       Skin Surgery
                        $60
                    </div>

                    <div class='service-card-1'>
                        Beauty Surgery
                        $65
                    </div>



                </>
        },
        {
            title: 'General Physican', content:
                <>
                    <div class='service-card-1'>
                       Routine Checkup
                        $70
                    </div>

                    <div class='service-card-1'>
                        Cold And Fever
                        $5
                    </div>

                    <div class='service-card-1'>
                       Any Specific Checkup
                        $60
                    </div>

                    <div class='service-card-1'>
                       Medical Card
                        $5
                    </div>


                </>
        },
        {
            title: 'Emergency', content:
                <>
                    <div class='service-card-1'>
                        Any Trauma
                        $45
                    </div>

                    <div class='service-card-1'>
                        Any Operation
                        $40
                    </div>

                    <div class='service-card-1'>
                        Not Breathing
                        $35
                    </div>

                    <div class='service-card-1'>
                        Panic Attacks
                        $30
                    </div>
                </>
        },

        // ... other service data ...
    ];

    const [serviceData, setServiceData] = useState(defaultServiceData);

    // // Function to fetch additional service data from the backend
    // async function fetchServiceDataFromBackend() {
    //     try {
    //         const response = await fetch('/api/services'); // Replace with your actual backend API endpoint
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         const data = await response.json();
    //         return data; // Assuming the data is an array of new service objects
    //     } catch (error) {
    //         console.error('Error fetching service data:', error);
    //         return []; // Return an empty array or handle the error as needed
    //     }
    // }

    // // Function to update the serviceData array with new data
    // async function updateServiceData() {
    //     const newServiceData = await fetchServiceDataFromBackend();
    //     if (newServiceData.length > 0) {
    //         // Merge or append the new data to the existing array
    //         const updatedServiceData = [...serviceData, ...newServiceData];
    //         // Update the state or variable holding your service data
    //         setServiceData(updatedServiceData); // If using React state
    //         // Alternatively, assign the updated data to your existing array
    //         // serviceData = updatedServiceData;
    //     }
    // }

    // // Call the updateServiceData function to fetch and update data when needed
    // useEffect(() => {
    //     updateServiceData();
    // }, []); // Empty dependency array ensures it runs only once on component mount




    const items = ['Haircut & Style',
        'Hair Color',
        'Spa Facial',
        'Eylashes Services',
        'Hair Removal',
        'Express Treatments'];
    const content = [
        <div className='list-1-detail'>
            <div className='detail-1'>
                <p className='list-detail-heading'>Women’s Haircut <br />
                    $75 - $90</p>

                <p className='list-detail-content'>Consult with our stylists to create a look that compliments your features and accents your personal style.
                    Includes a shampoo, blowdry and style.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Blowdry & Style
                    <br />
                    $55 - $60</p>

                <p className='list-detail-content'>Starting with freshly cleansed and conditioned hair, our stylists apply different
                    techniques to achieve the perfect straight, wavy or curly style.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Deep Conditioner<br />
                    $65</p>

                <p className='list-detail-content'>
                    This nutrient-rich treatment saves your strands from the stressors of day-to-day life by
                    adding extra moisture for shiny, healthy hair.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Men’s Haircut <br />
                    $60 - $70</p>

                <p className='list-detail-content'>
                    Add some swagger to your step with our high-quality men's haircuts.
                    Includes head massage, shampoo, cut, style & neck clean-up.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Brazilian Blowout
                    <br />
                    Starting at $315</p>

                <p className='list-detail-content'>
                    Brazilian Blowout is by far the most-requested hair smoothing treatment as it creates a protective
                    layer around each strand of hair, effectively diminishing frizz and promoting intense shine.</p>
            </div>
        </div>,
        <div className='list-1-detail'>
            <div className='detail-1'>
                <p className='list-detail-heading'>Hair Color
                    <br />$100-$150</p>
                <p className='list-detail-content'>Our expert colorists use the latest techniques and high-quality products to create a hair color that suits your personality and style.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Highlights<br />
                    Starting at $120</p>
                <p className='list-detail-content'>Add dimension and brightness to your hair with our professional highlighting services. Choose from a variety of shades and techniques.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Balayage
                    <br />Starting at $150</p>
                <p className='list-detail-content'>Get that sun-kissed, natural look with our custom balayage technique. Our colorists blend shades seamlessly for a stunning result.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Color Correction
                    <br />Price Varies</p>
                <p className='list-detail-content'>If you're unhappy with your current hair color, our color correction service can help you achieve your desired shade while maintaining hair health.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Ombre
                    <br />Starting at $130</p>
                <p className='list-detail-content'>Transform your look with the trendy ombre hair coloring technique. Our experts create a smooth transition between two shades for a striking effect.</p>
            </div>
        </div>
        ,
        <div className='list-1-detail'>
            <div className='detail-1'>
                <p className='list-detail-heading'>Classic Spa Facial
                    <br />$80</p>
                <p className='list-detail-content'>Indulge in relaxation with our classic spa facial. Includes deep cleansing, exfoliation, steam, extractions, mask, and soothing massage.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Anti-Aging Facial
                    <br />$100</p>
                <p className='list-detail-content'>Revitalize your skin with our anti-aging facial. Specialized products and techniques target fine lines, wrinkles, and promote a youthful complexion.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Hydrating Facial
                    <br />$90</p>
                <p className='list-detail-content'>Restore moisture balance to your skin with our hydrating facial. Perfect for dry or dehydrated skin, leaving you with a radiant glow.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Acne Clearing Facial
                    <br />$85</p>
                <p className='list-detail-content'>Combat acne and blemishes with our acne clearing facial. Deep cleansing, exfoliation, and targeted treatments help improve skin clarity.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Sensitive Skin Facial
                    <br />$95</p>
                <p className='list-detail-content'>Gentle care for sensitive skin. Our soothing facial calms irritation and redness, providing relief and leaving your skin feeling refreshed.</p>
            </div>
        </div>
        ,
        <div className='list-1-detail'>
            <div className='detail-1'>
                <p className='list-detail-heading'>Classic Eyelash Extensions
                    <br />$120</p>
                <p className='list-detail-content'>Enhance your natural beauty with our classic eyelash extensions. One extension is applied to each natural lash for a subtle yet stunning look.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Volume Eyelash Extensions
                    <br />$150</p>
                <p className='list-detail-content'>Get a more dramatic and voluminous look with our volume eyelash extensions. Multiple lightweight extensions are applied to each natural lash.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Eyelash Lift & Tint
                    <br />$75</p>
                <p className='list-detail-content'>Lift and curl your natural lashes while adding a tint for enhanced definition. Wake up with beautifully lifted and darkened lashes.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Eyelash Extension Refill
                    <br />$60</p>
                <p className='list-detail-content'>Maintain the longevity of your eyelash extensions with our refill service. Recommended every 2-3 weeks to keep your lashes looking full.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Lash Removal<br />$25</p>
                <p className='list-detail-content'>If you decide to remove your eyelash extensions, our gentle removal process ensures your natural lashes remain intact.</p>
            </div>
        </div>
        ,
        <div className='list-1-detail'>
            <div className='detail-1'>
                <p className='list-detail-heading'>Waxing Services
                    <br />Price Varies</p>
                <p className='list-detail-content'>Our waxing services offer hair removal solutions for various areas including eyebrows, upper lip, chin, legs, arms, and more. Prices depend on the area.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Threading
                    <br />Price Varies</p>
                <p className='list-detail-content'>Experience the precision of threading for facial hair removal. Our technicians shape eyebrows and remove unwanted facial hair with this ancient technique.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Laser Hair
                    <br />Price Varies</p>
                <p className='list-detail-content'>Permanently reduce unwanted hair with our advanced laser hair removal technology. Sessions are tailored to your needs for optimal results.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Bikini Wax
                    <br />Starting at $45</p>
                <p className='list-detail-content'>Get beach-ready with our bikini waxing services. Choose from a standard bikini wax or more comprehensive styles like Brazilian or Hollywood wax.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Body Sugaring
                    <br />Price Varies</p>
                <p className='list-detail-content'>Try the natural alternative to waxing with our body sugaring services. Gentle on the skin and effective for hair removal on various body parts.</p>
            </div>
        </div>
        ,
        <div className='list-1-detail'>
            <div className='detail-1'>
                <p className='list-detail-heading'>Express Facial
                    <br />$50</p>
                <p className='list-detail-content'>When time is limited, our express facial provides a quick and rejuvenating treatment to cleanse, exfoliate, and nourish your skin.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Mini Manicure
                    <br />$25</p>
                <p className='list-detail-content'>Give your hands some attention with our mini manicure. Includes nail shaping, cuticle care, and a polish application of your choice.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Mini Pedicure
                    <br />$30</p>
                <p className='list-detail-content'>Treat your feet with our mini pedicure. Relax in a foot soak, get nail shaping, cuticle care, and a polish application for a quick refresh.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Eyebrow Tinting
                    <br />$20</p>
                <p className='list-detail-content'>Enhance your brows with eyebrow tinting. Our experts apply a custom tint to match your desired shade, providing a defined look.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Lash Tinting
                    <br />$25</p>
                <p className='list-detail-content'>Darken your lashes with our lash tinting service. Achieve the appearance of mascara without the daily hassle.</p>
            </div>
        </div>

    ];








    // booking div
    const [isVisible, setIsVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cardsVisible, setCardsVisible] = useState(true);
    const [selectedService, setSelectedService] = useState(null);
    const [bookingDetail, setBookingDetail] = useState(null);


    const [clickedContents, setClickedContents] = useState([]);

    const [clickedServiceIndex, setClickedServiceIndex] = useState(null);

    const toggleDiv = () => {

        setIsVisible(!isVisible);
        setSelectedCard(null); // Reset selected card when toggling
        setCardsVisible(true); // Show the .cards div

        SetIsSuccess(null);
        setIsTimeSelected(null);


    };
    const openCardDetails = (cardIndex) => {
        setSelectedCard(cardIndex);
        setCardsVisible(false); // Hide the .cards div

        //pushing the professional name
        const clickedDiv = document.querySelector(`.card-0:nth-child(${cardIndex + 1})`);
        if (clickedDiv) {
            const contentElement = clickedDiv.querySelector('p');
            if (contentElement) {
                const content1 = contentElement.textContent;
                setClickedContents(prevContents => [...prevContents, { type: 'content-1-style', value: content1, index: prevContents.filter(item => item.type === 'content-1-style').length },]);
            }
        }
    };



    //close button for closing the service list
    const closeselectedcard = () => {
        setSelectedCard(null);
        setCardsVisible(true); // Show the .cards div
        setMinimized(false);
    };


    //to open the list of  service cards having service name and price
    const openServiceDetails = (serviceindex) => {

        //To Show the title of the service detail 
        const title = serviceData[serviceindex].title;

        const content = (
            <div>

                <div className='card-title'>{title}</div>
            </div>
        );

        //pushing the service name title
        // if (serviceindex >= 0) {
        //     const content2 = title;
        //     setClickedContents(prevContents => [...prevContents, { type: 'content-2-style', value: content2, index: prevContents.filter(item => item.type === 'content-2-style').length },]);
        // }


        //last
        setSelectedService(serviceindex);

        // Create a new array where all states are set to false except the selected one.
        const updatedStates = serviceCardStates.map((state, index) => index === serviceindex);
        setServiceCardStates(updatedStates);


    };


    const closeSelectedService = () => {
        sethighlited(null);
        //to get back
        setBookingDetail(false);//last
        setSelectedService(null);
        //function to delet the latest item form the array

    }


    //click of the service subtype (service subtype + price div)
    const handleClick = (serviceName, index) => {
        setBookingDetail(true);

        // const content3 = serviceName;
        // alert(content3); // Log content3 to see its value
        if (true) {
            const content3 = index;
            setClickedContents(prevContents => [...prevContents, { type: 'content-3-style', value: content3, index: prevContents.filter(item => item.type === 'content-3-style').length },]);
        }

        // const content3 = serviceName; 
        // setClickedContents(prevContents => [
        //     ...prevContents,
        //     {
        //         type: 'content-3-style',
        //         value: content3,
        //         index: prevContents.filter(item => item.type === 'content-3-style').length,
        //     },
        // ]);

        // alert(serviceName);
        sethighlited(index);
        // setselectedServiceCard2(index);
        //if any div is highlited then setting the selected item list div to maximized
        if (higlited) {
            setMinimized(false);
        }


        //for dynamically adding 

    };

    //for showing the sliced array to it's correct title
    const [serviceCardStates, setServiceCardStates] = useState(Array(serviceData.length).fill(false));



    const [higlited, sethighlited] = useState(null);
    const [minimized, setMinimized] = useState(false);

    const [isChooseTimeClicked, setIsChooseTImeClicked] = useState(null);


    const handleChooseTimeClick = () => {
        setIsChooseTImeClicked(!isChooseTimeClicked);
        handleMinimizeOrder();

        if (today.getDay() === 0 || today.getDay() === 1) {
            setShowTimeSlots2(true);
        }
        else { setShowTimeSlots1(true); }

        //For Book Now
        if (isTimeSelected && isUser) {

            // console.log("professional: " + clickedContents[0].value + " Service " + clickedContents[1].value);
            // clickedContents.map((item, index) => {
            //     console.log(`Item ${index}: ${item.value}`);
            // });

            // console.log("date: " + selectedDate + " time " + selectedTime);

            // console.log('total $' + totalPrice.toFixed(2))
            // const professional = clickedContents[0];
            clickedContents.forEach((item, index) => {
                if (index === 0) return;

                const variableName = `item${index}`;
                window[variableName] = item;
            });

            // Create object with professional and items
            const data = {
                professional: clickedContents[0].value,
                items: [],
                date: selectedDate+'  '+selectedTime,
                total: '$' + (totalPrice.toFixed(2)),
            };

            // Add items to array
            // Initialize counter
            let id = 1;

            // Loop through items
            for (let i = 1; i < clickedContents.length; i++) {

                // Extract name
                const itemValue = window[`item${i}`].value;
                const match = itemValue.match(/^(.*?)\$/);
                const name = match[1];

                // Create item object with id
                const item = {
                    id: id,
                    name
                };

                // Increment counter 
                id++;

                // Add item to array
                data.items.push(item);
            }

            // Stringify as JSON
            const jsonData = JSON.stringify(data);

             console.log(data);

            const dummy = {
                items: {},
                customer: 1,
                staff: 3,
                slot: 0,
                ordered: '',
                total: '21',
                status: 'X',
            }

            const jsonBody = JSON.stringify(dummy); 


            console.log('header token is : ' , tokenKey);
            fetch('https://thorfinn.pythonanywhere.com/api/v1/order/', {
                headers: {
                    'Authorization': `Token ${tokenKey}`, 
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: jsonBody 
              })
              .then(response => {
                if(response.status === 401) {
                  throw new Error('Auth failed: ' + response.statusText); 
                }
                return response.json();
              })
              .then(data => {
                console.log('Success:', data);
              })
              .catch((error) => {
                console.error('Error:', error);
            });

            // SetIsSuccess(true);

            // setTimeout(() => {
            //     toggleDiv();

            //     // Reload the page after 3 seconds
            //     setTimeout(() => {
            //         window.location.reload();
            //     }, 1000);
            // }, 3000); // 3000 milliseconds = 3 seconds
        }


        //toggleDiv();


    }
    //to toggle the order list div up and down 
    const handleMinimizeOrder = () => {
        setMinimized(!minimized);
    }


    const closeChooseTime = () => {
        setIsChooseTImeClicked(null);
        //marked
        setMinimized(false);

    }




    //to store the total price
    let totalPrice = 0;
    const selectedItems = [];

    // Loop through clickedContents and process each item
    clickedContents.forEach((item, index) => {
        // Split the content based on the '$' symbol
        const parts = item.value.split('$');

        // Check if there are multiple parts after splitting
        if (parts.length > 1) {
            const itemPrice = parseFloat(parts[1]);

            // Add the item to the selectedItems array
            selectedItems.push({ price: itemPrice });

            // Add the item price to the total price
            totalPrice += itemPrice;
        } else {
            // Handle items without pricing (if needed)
        }
    });

    // Render the list of selected items
    const itemList = selectedItems.map((item, index) => (
        <li key={index} >
            <span className="pricing">{`$${item.price.toFixed(2)}`}</span>
        </li>
    ));

    // Render the total price separately
    const total = (
        <div className="total-price">
            Total Price: ${totalPrice.toFixed(2)}
        </div>
    );


    //Storing the selected Time
    const [isTimeSelected, setIsTimeSelected] = useState(null);
    const [isSuccess, SetIsSuccess] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    // calander
    const [date, setDate] = useState(new Date()); // Initialize with today's date
    const [showTimeSlots1, setShowTimeSlots1] = useState(null);
    const [showTimeSlots2, setShowTimeSlots2] = useState(null);
    const today = new Date();


    const handleDateChange = (newDate) => {
        setDate(newDate);
        // toggleCalendar();
        today.setDate(today.getDate() - 1);

        if (newDate >= today) {
            if (newDate.getDay() === 0 || newDate.getDay() === 1) {
                setShowTimeSlots1(null);
                setShowTimeSlots2(true);
            }
            else {
                setShowTimeSlots1(true);
                setShowTimeSlots2(null);
            }

            // alert(today);
        } else {
            setShowTimeSlots1(null);
            setShowTimeSlots2(null);
            alert('Choose a valid date');
        }
    };

    const [calendarVisible, setCalendarVisible] = useState(true);

    // ... (array push button)
    const [isPushButtonVisible, setPushButtonVisible] = useState(false);
    //setPushButtonVisible(true);
    const handlePushButtonClick = () => {
        setPushButtonVisible(false);
        setMinimized(false);

        //storing the time
        const selectedDateElement = document.querySelector('.selected-date');
        if (selectedDateElement) {
            setSelectedDate(selectedDateElement.innerText);
        }

        //Displaying the Selected Time
        setIsTimeSelected(true);
    }
    const handleSelectedTimeClick = (timeSlot) => {
        setPushButtonVisible(true);
        //storing the time
        setSelectedTime(timeSlot.time);

    }


    //add more button
    const addMoreItems = () => {
        // closeSelectedService();
        setBookingDetail(false);//last
        setSelectedService(null);
        sethighlited(null);
    }

    //time slots
    const timeSlots1 = [
        { icon: <BsSunrise />, time: '10:00 AM' },
        { icon: <BsSunrise />, time: '11:00 AM' },
        { icon: <BsSun />, time: '12:00 PM' },
        { icon: <BsSun />, time: '01:00 PM' },
        { icon: <BsSun />, time: '02:00 PM' },
        { icon: <BsSun />, time: '03:00 PM' },
        { icon: <BsSun />, time: '04:00 PM' },
        { icon: <BsSunset />, time: '05:00 PM' },
        { icon: <BsSunset />, time: '06:00 PM' },
        { icon: <BsSunset />, time: '07:00 PM' },
    ];
    const timeSlots2 = [
        { icon: <BsSunrise />, time: '10:00 AM' },
        { icon: <BsSunrise />, time: '11:00 AM' },
        { icon: <BsSun />, time: '12:00 PM' },
        { icon: <BsSun />, time: '01:00 PM' },
        { icon: <BsSun />, time: '02:00 PM' },
        { icon: <BsSun />, time: '03:00 PM' },
        { icon: <BsSun />, time: '04:00 PM' },
        { icon: <BsSunset />, time: '05:00 PM' },
    ];


    //For Content 2

    const animatedCards = document.querySelectorAll('.card-left, .card-right');

    animatedCards.forEach((card, index) => {
        let animated = false;

        // Define different scroll thresholds for desktop and mobile
        const thresholds = window.innerWidth < 768 ? [200, 350, 650, 950, 1450, 1800] : [300, 600, 1100, 1400, 1900, 2300];

        window.addEventListener('scroll', () => {
            const threshold = thresholds[index];

            if (!animated && window.scrollY > threshold) {
                animated = true;
                card.classList.add('animate');
            }
        });
    });


    //for content 3

    const [isContent3Animated, setIsContent3Animated] = useState(false);
    const myDivRef = useRef(null);

    useEffect(() => {
        if (isContent3Animated) {
        }
    }, [isContent3Animated]);

    useEffect(() => {
        if (!myDivRef.current) return;

        function handleDivIntersection(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsContent3Animated(true);
                    observer.disconnect();
                }
            });
        }

        const options = {
            root: null,
            rootMargin: "-150px",
            threshold: 0.1
        };

        const observer = new IntersectionObserver(handleDivIntersection, options);

        observer.observe(myDivRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);




    // For Content 4

    //carusel
    const cardData = [
        { image: image1, name: 'Image 1' },
        { image: image2, name: 'Image 2' },
        { image: image3, name: 'Image 3' },
        { image: image4, name: 'Image 4' },
        { image: image5, name: 'Image 5' },
        { image: image6, name: 'Image 6' },
        { image: image7, name: 'Image 7' },
        { image: image8, name: 'Image 8' },
        { image: image9, name: 'Image 9' },
        { image: image10, name: 'Image 10' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const activeCardRef = useRef(null);

    const handlePrevClick = () => {
        setCurrentIndex((currentIndex - 1 + cardData.length) % cardData.length);
    };

    const handleNextClick = () => {
        setCurrentIndex((currentIndex + 1) % cardData.length);
    };

    const handleHover = () => {

        const body = document.body;
        body.style.overflowY = 'hidden'; // Disable vertical scrolling

    }

    const handleMouseLeave = () => {

        const body = document.body;
        body.style.overflow = 'auto';

    }


    // Add event listener to the window to enable scrolling when the mouse leaves the carousel



    useEffect(() => {
        if (activeCardRef.current && currentIndex !== 0) {  //To prevent this behavior, you can use a conditional check to ensure that scrollIntoView is only called when necessary
            activeCardRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            });
        }
    }, [currentIndex]);



    useEffect(() => {
        const carouselContainer = document.querySelector('.carousel');
        let isScrolling = false;
        let touchStartX = null;
        let touchEndX = null;

        const handleTouchStart = (event) => {
            touchStartX = event.touches[0].clientX;
        };

        const handleTouchEnd = (event) => {

            touchEndX = event.changedTouches[0].clientX;
            const swipeDistance = touchEndX - touchStartX;

            if (swipeDistance > 30) {

                // Right swipe
                handlePrevClick();
            } else if (swipeDistance < -30) {
                // Left swipe

                handleNextClick();
            }
        };

        const handleWheelScroll = (event) => {
            if (isScrolling) return;

            if (event.deltaY > 40) {
                isScrolling = true;
                setTimeout(() => {
                    handleNextClick(); // Scroll down, go to the next card
                    isScrolling = false;
                }, 500); // Adjust the delay time (in milliseconds) as needed
            } else if (event.deltaY < -40) {
                isScrolling = true;
                setTimeout(() => {
                    handlePrevClick(); // Scroll up, go to the previous card
                    isScrolling = false;
                }, 500); // Adjust the delay time (in milliseconds) as needed
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                handlePrevClick(); // Left arrow key
            } else if (event.key === 'ArrowRight') {
                handleNextClick(); // Right arrow key
            }
        };

        if (carouselContainer) {
            carouselContainer.addEventListener('wheel', handleWheelScroll, { passive: true });
            window.addEventListener('keydown', handleKeyDown); // Listen for keydown events
            carouselContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
            carouselContainer.addEventListener('touchend', handleTouchEnd);

            return () => {
                carouselContainer.removeEventListener('wheel', handleWheelScroll);
                window.removeEventListener('keydown', handleKeyDown); // Remove the event listener
                carouselContainer.removeEventListener('touchstart', handleTouchStart);
                carouselContainer.removeEventListener('touchend', handleTouchEnd);

            };
        }
    }, [currentIndex]);



    //For content 5

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleList = () => {
        setIsExpanded(!isExpanded);
    };

    //for content 7

    const [isContent7Animated, setIsContent7Animated] = useState(false);
    const myDiv7Ref = useRef(null);

    useEffect(() => {
        if (isContent7Animated) {
        }
    }, [isContent7Animated]);

    useEffect(() => {
        if (!myDiv7Ref.current) return;

        function handleDivIntersection(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsContent7Animated(true);
                    observer.disconnect();
                }
            });
        }

        const options = {
            root: null,
            rootMargin: "-150px",
            threshold: 0.1
        };

        const observer = new IntersectionObserver(handleDivIntersection, options);

        observer.observe(myDiv7Ref.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    //for content 8

    const [isContent8Animated, setIsContent8Animated] = useState(false);
    const myDiv8Ref = useRef(null);

    useEffect(() => {
        if (isContent8Animated) {
        }
    }, [isContent8Animated]);

    useEffect(() => {
        if (!myDiv8Ref.current) return;

        function handleDivIntersection(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsContent8Animated(true);
                    observer.disconnect();
                }
            });
        }

        const options = {
            root: null,
            rootMargin: "-150px",
            threshold: 0.1
        };

        const observer = new IntersectionObserver(handleDivIntersection, options);

        observer.observe(myDiv8Ref.current);

        return () => {
            observer.disconnect();
        };
    }, []);


    return (
        <div className='home-page'>
            <div className='content-1' id="content1" >
                <div className='tagline'><p>We are here to hear and heal your <span>health</span> problems. </p>

                    <div className='container'>

                        <div className='book-btn' onClick={toggleDiv} id='content4'>
                            Book Now
                        </div>

                        {isVisible && (
                            <div id='parent-div' className={`animated-div scrollbar ${isVisible ? 'slide-in' : 'slide-out'} ${minimized ? 'animated-div-overflow-hidden' : ''}`}                            >
                                {/* booking header div */}
                                <div className='header-container'>
                                    <div className='book-header'>
                                        <h3>{selectedCard !== null ? 'Choose a service' : 'Choose a professional'}</h3>
                                        {/* <h2>
                                            {selectedCard !== null
                                                ? 'Choose a service'
                                                : showTimeSelection !== null
                                                    ? 'Choose Time'
                                                    : 'Choose a professional'}
                                        </h2> */}
                                        <button className='close-btn' onClick={toggleDiv}>
                                            <AiOutlineClose className='close-icon' />
                                        </button>
                                    </div>
                                </div>

                                {/* this div has the list of all the professionals */}
                                <div className={`cards ${cardsVisible ? '' : 'hidden'}`}>
                                    {professionals.map((professional, index) => (
                                        <div
                                            className={`card-0 ${selectedCard === index ? 'card-expanded' : ''}`}
                                            key={index}
                                            onClick={() => openCardDetails(index)}
                                        >
                                            <img className='card-0-proff' src={professional.image} alt={`Image for ${professional.name}`} />
                                            <p>{professional.name}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* this div has all the service types listed*/}
                                {selectedCard !== null && (
                                    <div className='expanded-card scrollbar '>
                                        {/* <button className='close-btn ' onClick={closeselectedcard}>
                                            <AiOutlineClose className='close-icon' />
                                        </button> */}
                                        <div className='service-cards'>
                                            {serviceData.map((service, serviceindex) => (
                                                <div
                                                    key={serviceindex}
                                                    className={`service-card-1 ${selectedService === serviceindex ? 'selected' : ''
                                                        } ${clickedServiceIndex === serviceindex ? 'clicked' : ''}`}
                                                    onClick={() => openServiceDetails(serviceindex)}
                                                >
                                                    <div>
                                                        <p>{service.title}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* this div has all the types of services  prices */}
                                {selectedService !== null && (
                                    <div className='expanded-card scrollbar'>
                                        <button className='close-btn' onClick={closeSelectedService}>
                                            <AiOutlineClose className='close-icon' />
                                        </button>
                                        {/* <h1 style={{ color: "red" }}>{serviceData[selectedService].title}</h1> */}
                                        <div className='' style={{ color: 'black' }} >
                                            {/* {serviceData[selectedService].content }  */}

                                            {serviceData.map((service, index) => (
                                                serviceCardStates[index] && (
                                                    <div key={index}>
                                                        <h3 style={{ color: 'black' }}>{service.title}</h3>
                                                        <div style={{ color: 'black' }} className="service-cards">
                                                            {service.content.props.children.map((child, i) => {
                                                                const serviceName = child.props.children;
                                                                const [beforeDollar, afterDollar] = serviceName.split('$');
                                                                return (
                                                                    <div
                                                                        key={i}
                                                                        className={`service-card-1 ${higlited === i ? 'selected' : ''}`}
                                                                        onClick={() => handleClick(index, serviceName)}
                                                                    >
                                                                        <span className="service-name">{beforeDollar}</span>
                                                                        <span className="service-price">${afterDollar}</span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )
                                            ))}

                                        </div>
                                    </div>

                                )}

                                {/* To open the div Having calendar and time slots */}
                                {isChooseTimeClicked !== null && (
                                    <div className='expanded-card scrollbar choose-time-div' >
                                        <button className='close-btn' onClick={closeChooseTime}>
                                            <AiOutlineClose className='close-icon' />
                                        </button>

                                        {calendarVisible !== null && (
                                            <div className='date-picker'>
                                                <Calendar
                                                    onChange={handleDateChange}
                                                    value={date}
                                                />
                                            </div>
                                        )}

                                        {showTimeSlots1 !== null && (
                                            <div >

                                                {/* This div will be shown for today or future dates */}
                                                <div className='Time-slots-header'>
                                                    <div className='Time-slots-header-text'><p>All Available Times</p></div>
                                                    <div className='selected-date'>{date.toDateString()}</div>
                                                </div>
                                                <div className='Time-slots'>
                                                    {timeSlots1.map((timeSlot, index) => (
                                                        <div className='time-slot-card' key={index} onClick={() => handleSelectedTimeClick(timeSlot)}>
                                                            {timeSlot.icon} {timeSlot.time}
                                                        </div>
                                                    ))}
                                                </div>

                                            </div>
                                        )}
                                        {showTimeSlots2 !== null && (
                                            <div >

                                                {/* This div will be shown for today or future dates */}
                                                <div className='Time-slots-header'>
                                                    <div className='Time-slots-header-text'><p>All Available Times</p></div>
                                                    <div className='selected-date'>{date.toDateString()}</div>
                                                </div>
                                                <div className='Time-slots'>
                                                    {timeSlots2.map((timeSlot, index) => (
                                                        <div className='time-slot-card' key={index} onClick={() => handleSelectedTimeClick(timeSlot)}>
                                                            {timeSlot.icon} {timeSlot.time}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                )}

                                {/* Pushing items to cart */}
                                {isPushButtonVisible && (
                                    <button className='CartPush' id="myButton" onClick={handlePushButtonClick}>
                                        <TiTick className='tick' />
                                    </button>
                                )}

                                <div className={`clicked-div-content ${bookingDetail ? (minimized ? 'clicked-div-content-active' : '') : 'hidden'}`}>
                                    <div className='clicked-div-content-header'>
                                        <h2>Your Order</h2>
                                        <button onClick={handleMinimizeOrder} className='button-28'>
                                            {minimized ? <MdExpandLess /> : <MdExpandMore />}
                                        </button>
                                    </div>

                                    <ul className='array-info'>
                                        <div>
                                            {/* Render the contents of clickedContents */}
                                            {clickedContents.map((item, index) => {
                                                // Split the content based on the '$' symbol
                                                const parts = item.value.split('$');

                                                // Check if there are multiple parts after splitting
                                                if (parts.length > 1) {
                                                    return (
                                                        <li key={index} className={item.type}>
                                                            <span className='clicked-service-name'>{parts[0]}</span>  <span className="pricing">{`$${parts[1]}`}</span>
                                                            {/* - Index: {item.index} */}
                                                        </li>

                                                    );
                                                } else {
                                                    return (
                                                        <li key={index} className={`item.type proffname`}>
                                                            {'By ' + item.value}
                                                            {/* - Index: {item.index} */}
                                                        </li>
                                                    );
                                                }

                                            })}

                                            {isTimeSelected != null && (
                                                <div className='selected-date-time content-3-style'>
                                                    {selectedDate + ' '}
                                                    {'at ' + selectedTime}
                                                </div>)
                                            }


                                            <div className='total-price'>
                                                {total}
                                            </div>



                                        </div>
                                        {/* Display the total price in a separate div */}

                                    </ul>

                                    {isTimeSelected == null && (
                                        <div className='add-more-div' onClick={addMoreItems}>Add More</div>)
                                    }

                                    <button className="button-48" role="button" onClick={handleChooseTimeClick}>

                                        <span className="text">
                                            {isUser ? <div  >Book Now </div> : (isTimeSelected ? <div style={{
                                                padding: '0',
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }} onClick={handleLoginClick}>Login

                                            </div> : 'Choose a time')}
                                        </span>
                                    </button>





                                </div>


                                {isSuccess && (
                                    <div class="success-animation">
                                        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                        </svg>

                                        <p>Success</p>
                                    </div>
                                )}

                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='content-2' id='content2'>

                <h1>SERVICES WE OFFER</h1>
                <div className='cards'>
                    <div className='card-1 card-left'>
                        <div className='card-img'></div>
                        <div className='card-info-left'>
                            <h4>Neurosurgeon</h4>
                            <p>Neurosurgery is the branch of medicine that deals with surgery<br />
                            of the nervous system. The nervous system is made up of the <br />
                            central nervous nervous system and the peripheral nervous system.</p>
                        </div>
                    </div>
                    <div className='card-2 card-right'>
                        <div className='card-info-right'>
                            <h4>Gynecologist</h4>
                            <p>A gynecologist is a physician who specializes in diagnosing and<br />
                            treating diseases of the female reproductive system. <br />
                            Your reproductive system is responsible for pregnancy and menstruation. </p>
                        </div>
                        <div className='card-img'></div>
                    </div>
                    <div className='card-3 card-left'>
                        <div className='card-img'></div>
                        <div className='card-info-left'>
                            <h4>Cardiologist</h4>
                            <p>A cardiologist is a medical doctor who studies and treats<br />
                            diseases and conditions of the cardiovascular system<br />
                             </p>
                        </div>
                    </div>
                    <div className='card-4 card-right'>
                        <div className='card-info-right'>
                            <h4>Orthologist</h4>
                            <p>Orthopedic surgery or orthopedics is the branch of surgery concerned <br />
                            with conditions involving the musculoskeletal system.<br />
                            Orthopedic surgeons use both surgical and nonsurgical </p>
                        </div>
                        <div className='card-img'></div>
                    </div>
                    <div className='card-5 card-left'>
                        <div className='card-img'></div>
                        <div className='card-info-left'>
                            <h4>General Physcian</h4>
                            <p>General Physicians are highly trained specialists who provide a range of non-surgical health<br />
                            care to adult patients. <br />
                            General physicians are consultants who care for patients with special or difficult problems.</p>
                        </div>
                    </div>
                    <div className='card-6 card-right'>
                        <div className='card-info-right'>
                            <h4>Dermatologist</h4>
                            <p>Dermatology involves the study, research, diagnosis, and<br />
                            management of any health conditions that may affect the skin <br />
                            fat hair, nails, and membranes.</p>
                        </div>
                        <div className='card-img'></div>
                    </div>
                </div>

            </div>


            <div className="content-3" id="content3" ref={myDivRef}>
            <h1>ABOUT US</h1>
                <div className={`content-3-img ${isContent3Animated ? 'slideInLeft' : ''}`}></div>
                <div className={`content-3-info ${isContent3Animated ? 'slideInRight' : ''}`}>
                    
                    <p>
                    Expertise and Experience: With a team of highly skilled and experienced healthcare professionals, we are equipped to address a wide range of medical needs. Our doctors, nurses, and support staff are committed to staying abreast of the latest medical advancements to ensure that our patients receive the best possible care.

                    State-of-the-Art Facilities: We take pride in our modern and well-equipped facilities, designed to provide a comfortable and healing environment. From advanced diagnostic tools to cutting-edge treatment options, we invest in technologies that enhance the quality of healthcare services.

                    Comprehensive Services: We offer a comprehensive range of medical services, including but not limited to general medicine, surgery, pediatrics, obstetrics, and emergency care. Our goal is to be your healthcare partner, supporting you at every stage of life.
                        
                    </p>
                </div>
            </div>

            <div className="content-4">
                <h1>OUR TALENTED STAFF</h1>

                <div className="carousel-container" >
                    <button className="prev-button" onClick={handlePrevClick}>
                        <BiSolidChevronLeft />
                    </button>
                    <div className="carousel">
                        <div className="carousel-card empty"><img src={image1} alt="Image Description" /></div>
                        {cardData.map((item, index) => (
                            <div
                                className={`carousel-card ${currentIndex === index ? 'active' : ''}`}
                                key={index}
                                ref={currentIndex === index ? activeCardRef : null}
                                onMouseLeave={handleMouseLeave}
                                onMouseEnter={handleHover}
                            >
                                <img src={item.image} alt={`Image ${index + 1}`} />
                                {currentIndex === index && (
                                    <div className="content">
                                        <p>{item.name}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="carousel-card empty">
                            <img src={image1} alt="Image Description" />
                        </div>
                    </div>
                    <button className="next-button" onClick={handleNextClick}>
                        <BiSolidChevronRight />
                    </button>
                </div>

            </div>




        
        

        

        
        
        
        
        
        
          
          
          
          


    
    

    
    
    
    
    
    
    
          
          
          
          
          
          

          
          
        
        

        

        
          

            <div className="content-6">
                <h1>TESTIMONIALS</h1>

                <AliceCarousel className='content-6-box' >
                    <div onDragStart={handleOnDragStart} className='content-6-card'>

                        <p>
                          "Our experience at was nothing short of exceptional. From the moment we arrived,<br />
                          the entire staff demonstrated unwavering compassion and professionalism.<br />
                           The doctors, nurses, and support staff worked seamlessly to provide our loved one with <br /> 
                          the best possible care. We are immensely grateful for the expertise and dedication exhibited by the entire team<br /> . 
                          Our family extends heartfelt thanks for the outstanding service and care during a challenging time."
                        </p>
                        <img className='content-6-img img1' />
                        <p>~Cherry</p>
                    </div>
                    <div onDragStart={handleOnDragStart} className='content-6-card'>

                        <p>
                        "I can't express enough gratitude for the exceptional care I received .<br />
                         When I was admitted in critical condition, the medical team swiftly and effectively stabilized me.<br />
                          The level of expertise and attention to detail displayed by the doctors and nurses was truly impressive. <br />
                          Moreover, the support staff went above and beyond to ensure my comfort and well-being. Thanks to the outstanding care I received<br />
                          , I am now on the road to recovery. I am forever thankful for the skilled and compassionate professionals<br />

                        </p>
                        <img className='content-6-img img2' />
                        <p>~Aqua</p>
                    </div>

                </AliceCarousel>
            </div>
            <div className="content-9">
                <div>
                    <h2>About our hospital</h2>
                    <p>
                        Nestled on the top of Queen Anne <br />
                        Hill, Intermezzo Salon & Spa has been <br />
                        Seattle’s premiere boutique salon for for  <br />
                        over 20 years. Our staff of highly-trained <br />
                        professionals is committed to bringing <br />
                        best-in-class service and products <br />
                        designed to make you feel and look <br />
                        your best.</p>
                </div>
                <div>

                    <h2>Contact Details</h2>
                    <div>
                        <p> <ImLocation />Pakri chowk , Ara </p>
                        <p> <IoCallOutline />  123 456 789</p>
                        <p> <PiPaperPlaneTiltLight /> info@callusnow.com</p>
                    </div>
                    <div>
                        <h2>Follow Us</h2>
                        <ul>
                            <li> <AiOutlineInstagram className='icons' /> </li>
                            <li><AiOutlineWhatsApp className='icons' /></li>
                            <li><AiOutlineFacebook className='icons' /></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h2>Opening Time</h2>
                    <div className='lines'>
                        <table></table>
                        <table></table>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th className='th' colSpan={2}>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Monday</td>
                                <td><p>10:00 -- 10:00</p></td>
                            </tr>
                            <tr>
                                <td>Tuesday</td>
                                <td>10:00 -- 10:00</td>
                            </tr>
                            <tr>
                                <td>Webnesday</td>
                                <td>10:00 -- 10:00</td>
                            </tr>
                            <tr>
                                <td>Thursday</td>
                                <td>10:00 -- 10:00</td>
                            </tr>
                            <tr>
                                <td>Friday</td>
                                <td>10:00 -- 10:00</td>
                            </tr>
                            <tr>
                                <td>Saturday</td>
                                <td>10:00 -- 10:00</td>
                            </tr>
                            <tr>
                                <td>Sunnday</td>
                                <td>10:00 -- 8:00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
};


export default HomePage;