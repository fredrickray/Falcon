import React from 'react';
import Logo from "../assets/img/intro.png"
import BusinessLogo from "../assets/img/business-img.png"
import CEO from "../assets/img/CEO.png"
import Member1 from "../assets/img/Member1.png"
import Member2 from "../assets/img/Member2.png"
import Blog1 from "../assets/img/blog1.jpg"
import Blog3 from "../assets/img/blog3.jpg"
import Blog4 from "../assets/img/blog4.jpg"
import Contact1 from "../assets/img/contact1.png"
import { useNavigate } from 'react-router-dom';



const Index = () => {

    const navigate = useNavigate()
    return (
        <div>
            {/* <!-- Header Section Start --> */}
            <header id="home" className="hero-area">
                <div className="overlay">
                    <span></span>
                    <span></span>
                </div>
                <nav className="navbar navbar-expand-md bg-inverse fixed-top scrolling-navbar">
                    <div className="container">
                        <a href="index.html" className="navbar-brand"><img src="img/logo.png" alt="" /></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="lni-menu"></i>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav mr-auto w-100 justify-content-end">
                                <li className="nav-item">
                                    <a className="nav-link page-scroll" href="#home">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link page-scroll" href="#services">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link page-scroll" href="#features">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link page-scroll" href="#team">Team</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link page-scroll" href="#blog">Blog</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link page-scroll" href="#contact">Contact</a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <div className="row space-100">
                        <div className="col-lg-6 col-md-12 col-xs-12">
                            <div className="contents">
                                <h2 className="head-title">Introducing <span style={{color: "#c22d66"}}> ShopEase</span>: Your Gateway to Simplicity and Efficiency</h2>
                                <p>Discover a new level of ease with our app. From streamlined tasks to instant solutions, it's your all-in-one tool for making things happen effortlessly. Experience the power of simplicity and efficiency at your fingertips.</p>
                                <div className="header-button">
                                    <button onClick={() => navigate('/Register')} style={{borderRadius: "4px", color: "white"}} rel="nofollow" className="btn-border-filled">GET STARTED</button>
                                    <button rel="nofollow" style={{marginLeft: "4%", borderRadius: "4px"}} className="btn-border page-scroll">CONTACT US</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-xs-12 p-0">
                            <div className="intro-img">
                                <img src={Logo} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* <!-- Header Section End -->  */}

            {/* <!-- Services Section Start --> */}
            <section id="services" className="section">
                <div className="container">

                    <div className="row">
                        {/* <!-- Start Col --> */}
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div className="services-item text-center">
                                <div className="icon">
                                    <i className="lni-timer"></i>
                                </div>
                                <h4>Online</h4>
                                <p>Embrace the Digital Shift: Seamlessly Take Your Business Online</p>
                            </div>
                        </div>
                        {/* <!-- End Col -->
          <!-- Start Col --> */}
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div className="services-item text-center">
                                <div className="icon">
                                    <i className="lni-delivery"></i>
                                </div>
                                <h4>Swift Delivery</h4>
                                <p>Get ready to enjoy hassle-free payments and receive your orders in record time. Because when it comes to your time, we're committed to delivering more than just products – we're delivering efficiency</p>
                            </div>
                        </div>
                        {/* <!-- End Col -->
          <!-- Start Col --> */}
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div className="services-item text-center">
                                <div className="icon">
                                    <i className="lni-credit-cards"></i>
                                </div>
                                <h4>Swift Payment</h4>
                                <p>Experience the ultimate convenience with our lightning-fast payment processing </p>
                            </div>
                        </div>
                        {/* <!-- End Col --> */}

                    </div>
                </div>
            </section>
            {/* <!-- Services Section End --> */}

            {/* <!-- Business Plan Section Start --> */}
            <section id="business-plan">
                <div className="container">

                    <div className="row">
                        {/* <!-- Start Col --> */}
                        <div className="col-lg-6 col-md-12 pl-0 pt-70 pr-5">
                            <div className="business-item-img">
                                <img src={BusinessLogo} className="img-fluid" alt="" />
                            </div>
                        </div>
                        {/* <!-- End Col -->
          <!-- Start Col --> */}
                        <div className="col-lg-6 col-md-12 pl-4">
                            <div className="business-item-info">
                                <h3>Crafted For Business, Startup and Agency Websites</h3>
                                <p>Elevate your business or startup by embracing the boundless opportunities of the digital realm. Taking your venture online opens doors to a global audience, 24/7 accessibility, and streamlined operations.  <br /> Enjoy cost-effective marketing, effortless customer engagement, and the flexibility to adapt to changing market trends.  <br />  Whether you're a seasoned entrepreneur or a fresh startup, the online landscape empowers you to scale, innovate, and succeed like never before. <br /> Embrace the digital shift and watch your business flourish in the digital age! </p>

                                <button onClick={() => navigate("/Register")} style={{borderRadius: "4px", color: "white"}} className="btn-common" href>Get Started</button>
                            </div>
                        </div>
                        {/* <!-- End Col --> */}

                    </div>
                </div>
            </section>
            {/* <!-- Business Plan Section End --> */}

            {/* <!-- Cool Fetatures Section Start --> */}
            <section id="features" className="section">
                <div className="container">
                    {/* <!-- Start Row --> */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="features-text section-header text-center">
                                <div>
                                    <h2 className="section-title">Services We Provide</h2>
                                    <div className="desc-text">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do <br /> eiusmod tempor incididunt ut labore et dolore.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <!-- End Row -->
                    <!-- Start Row --> */}
                    <div className="row featured-bg">
                        {/* <!-- Start Col --> */}
                        <div className="col-lg-6 col-md-6 col-xs-12 p-0">
                            {/* <!-- Start Fetatures --> */}
                            <div className="feature-item featured-border1">
                                <div className="feature-icon float-left">
                                    <i className="lni-coffee-cup"></i>
                                </div>
                                <div className="feature-info float-left">
                                    <h4>Efficiency Redefined</h4>
                                    <p>Achieve more with less. <br />Our service streamlines tasks for maximum results <br /> in minimum time.</p>
                                </div>
                            </div>
                            {/* <!-- End Fetatures --> */}
                        </div>
                        {/* <!-- End Col --> */}

                        {/* <!-- Start Col --> */}
                        <div className="col-lg-6 col-md-6 col-xs-12 p-0">
                            {/* <!-- Start Fetatures --> */}
                            <div className="feature-item featured-border2">
                                <div className="feature-icon float-left">
                                    <i className="lni-bolt"></i>
                                </div>
                                <div className="feature-info float-left">
                                    <h4>Speed at Its Best</h4>
                                    <p> Get what you need when you need it. <br />Our service operates at lightning speed <br />for instant gratification.</p>
                                </div>
                            </div>
                            {/* <!-- End Fetatures --> */}
                        </div>
                        {/* <!-- End Col -->
          
                        <!-- Start Col --> */}
                        <div className="col-lg-6 col-md-6 col-xs-12 p-0">
                            {/* <!-- Start Fetatures --> */}
                            <div className="feature-item featured-border1">
                                <div className="feature-icon float-left">
                                    <i className="lni-invention"></i>
                                </div>
                                <div className="feature-info float-left">
                                    <h4>Simplified Solutions"</h4>
                                    <p>No more confusion.  <br /> Our user-friendly service simplifies tasks,<br /> experience smooth and easy.</p>
                                </div>
                            </div>
                            {/* <!-- End Fetatures --> */}
                        </div>
                        {/* <!-- End Col --> */}

                        {/* <!-- Start Col --> */}
                        <div className="col-lg-6 col-md-6 col-xs-12 p-0">
                            {/* <!-- Start Fetatures --> */}
                            <div className="feature-item featured-border2">
                                <div className="feature-icon float-left">
                                    <i className="lni-layers"></i>
                                </div>
                                <div className="feature-info float-left">
                                    <h4>Transparent Transactions</h4>
                                    <p>No hidden surprises. <br /> Our service offers clear pricing <br /> and real-time updates for confident decisions.</p>
                                </div>
                            </div>
                            {/* <!-- End Fetatures --> */}
                        </div>
                        {/* <!-- End Col --> */}

                        {/* <!-- Start Col --> */}
                        <div className="col-lg-6 col-md-6 col-xs-12 p-0">
                            {/* <!-- Start Fetatures --> */}
                            <div className="feature-item featured-border3">
                                <div className="feature-icon float-left">
                                    <i className="lni-reload"></i>
                                </div>
                                <div className="feature-info float-left">
                                    <h4>Quality Beyond Compromise</h4>
                                    <p> Excellence is our standard. <br />Experience top-tier quality in every aspect of our service.</p>
                                </div>
                            </div>
                            {/* <!-- End Fetatures --> */}
                        </div>
                        {/* <!-- End Col --> */}

                        {/* <!-- Start Col --> */}
                        <div className="col-lg-6 col-md-6 col-xs-12 p-0">
                            {/* <!-- Start Fetatures --> */}
                            <div className="feature-item">
                                <div className="feature-icon float-left">
                                    <i className="lni-support"></i>
                                </div>
                                <div className="feature-info float-left">
                                    <h4>Tailored for You</h4>
                                    <p>Your needs, your way. <br /> Our service adapts to provide you with a personalized<br />and successful journey.</p>
                                </div>
                            </div>
                            {/* <!-- End Fetatures --> */}
                        </div>
                        {/* <!-- End Col --> */}


                    </div>
                    {/* <!-- End Row --> */}
                </div>
            </section>
            {/* <!-- Cool Fetatures Section End -->  */}

            {/* <!-- Team section Start --> */}
            <section id="team" className="section">
                <div className="container">
                    {/* <!-- Start Row --> */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="team-text section-header text-center">
                                <div>
                                    <h2 className="section-title">Team Members</h2>
                                    <div className="desc-text">
                                        <p>Our app's creation was a collaborative effort of exceptional individuals, each bringing their unique expertise to the table. </p>
                                        <p>From visionary developers and innovative designers to strategic marketers and meticulous quality assurance specialists, <br /> our team is a diverse blend of talents.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <!-- End Row --> */}
                    {/* <!-- Start Row --> */}
                    <div className="row">
                        {/* <!-- Start Col --> */}
                        <div className="col-lg-3 col-md-6 col-xs-12">
                            <div className="single-team">
                                <div className="team-thumb">
                                    <img src={CEO} className="img-fluid" alt="" />
                                </div>

                                <div className="team-details">
                                    <div className="team-social-icons">
                                        <ul className="social-list">
                                            <li><a href><i className="lni-facebook-filled"></i></a></li>
                                            <li><a href="https://twitter.com/FredrickAnyanw1"><i className="lni-twitter-filled"></i></a></li>
                                            <li><a href><i className="lni-linkedin-filled"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="team-inner text-center">
                                        <h5 className="team-title">Fredrick Anyanwu</h5>
                                        <p>CEO/ Developer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Start Col --> */}

                        {/* <!-- Start Col --> */}
                        <div className="col-lg-3 col-md-6 col-xs-12">
                            <div className="single-team">
                                <div className="team-thumb">
                                    <img src={Member1} className="img-fluid" alt="" />
                                </div>

                                <div className="team-details">
                                    <div className="team-social-icons">
                                        <ul className="social-list">
                                            <li><a href><i className="lni-facebook-filled"></i></a></li>
                                            <li><a href><i className="lni-twitter-filled"></i></a></li>
                                            <li><a href><i className="lni-linkedin-filled"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="team-inner text-center">
                                        <h5 className="team-title">Uchenna Nnodim</h5>
                                        <p>Front-end Developer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Start Col --> */}

                        {/* <!-- Start Col --> */}
                        <div className="col-lg-3 col-md-6 col-xs-12">
                            <div className="single-team">
                                <div className="team-thumb">
                                    <img src={Member2} className="img-fluid" alt="" />
                                </div>

                                <div className="team-details">
                                    <div className="team-social-icons">
                                        <ul className="social-list">
                                            <li><a href><i className="lni-facebook-filled"></i></a></li>
                                            <li><a href="https://twitter.com/theuchenna"><i className="lni-twitter-filled"></i></a></li>
                                            <li><a href><i className="lni-linkedin-filled"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="team-inner text-center">
                                        <h5 className="team-title">Samuel Owhondah</h5>
                                        <p>Full-Stack Developer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Start Col --> */}

                        {/* <!-- Start Col --> */}
                        <div className="col-lg-3 col-md-6 col-xs-12">
                            <div className="single-team">
                                <div className="team-thumb">
                                    <img src="img/team/04.jpg" className="img-fluid" alt="" />
                                </div>

                                <div className="team-details">
                                    <div className="team-social-icons">
                                        <ul className="social-list">
                                            <li><a href><i className="lni-facebook-filled"></i></a></li>
                                            <li><a href><i className="lni-twitter-filled"></i></a></li>
                                            <li><a href><i className="lni-linkedin-filled"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="team-inner text-center">
                                        <h5 className="team-title">Mark Parker</h5>
                                        <p>Support Engineer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Start Col --> */}


                    </div>
                    {/* <!-- End Row --> */}
                </div>
            </section>
            {/* <!-- Team section End --> */}

            {/* <!-- Blog Section --> */}
            <section id="blog" className="section">
                {/* <!-- Container Starts --> */}
                <div className="container">
                    {/* <!-- Start Row --> */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="blog-text section-header text-center">
                                <div>
                                    <h2 className="section-title">Latest Blog Posts</h2>
                                    <div className="desc-text">
                                        <p>Embrace the Digital Shift: </p>
                                        <p>Seamlessly Take Your Business Online</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <!-- End Row --> */}
                    {/* <!-- Start Row --> */}
                    <div className="row">
                        {/* <!-- Start Col --> */}
                        <div className="col-lg-4 col-md-6 col-xs-12 blog-item">
                            {/* <!-- Blog Item Starts --> */}
                            <div className="blog-item-wrapper">
                                <div className="blog-item-img">
                                    <a href="single-post.html">
                                        <img src={Blog1} className="img-fluid" alt="" />
                                    </a>
                                </div>
                                <div className="blog-item-text">
                                    <h3><a href="single-post.html">How Slick Will Transform  <br />Your Business</a></h3>
                                    <p>Embrace the ease of reaching a global audience, managing transactions effortlessly, and leveraging the power of online marketing. Elevate your business with just a few clicks and open the door to unlimited growth opportunities.</p>
                                    <a href className="read-more">5 Min read</a>
                                </div>
                                <div className="author">
                                    <span className="name"><i className="lni-user"></i><a href>Posted by Admin</a></span>
                                    <span className="date float-right"><i className="lni-calendar"></i><a href>10 April, 2023</a></span>
                                </div>
                            </div>
                            {/* <!-- Blog Item Wrapper Ends--> */}
                        </div>
                        {/* <!-- End Col --> */}
                        {/* <!-- Start Col --> */}
                        <div className="col-lg-4 col-md-6 col-xs-12 blog-item">
                            {/* <!-- Blog Item Starts --> */}
                            <div className="blog-item-wrapper">
                                <div className="blog-item-img">
                                    <a href="single-post.html">
                                        <img src={Blog3} className="img-fluid" alt="" />
                                    </a>
                                </div>
                                <div className="blog-item-text">
                                    <h3><a href="single-post.html">Embrace the future of business   <br />with seamless simplicity</a></h3>
                                    <p>Taking your venture online has never been easier. With user-friendly platforms and a plethora of resources at your fingertips, you'll swiftly transform your business into a digital success story.</p>
                                    <a href className="read-more">5 Min read</a>
                                </div>
                                <div className="author">
                                    <span className="name"><i className="lni-user"></i><a href>Posted by Admin</a></span>
                                    <span className="date float-right"><i className="lni-calendar"></i><a href>10 April, 2023</a></span>
                                </div>
                            </div>
                            {/* <!-- Blog Item Wrapper Ends--> */}
                        </div>
                        {/* <!-- End Col --> */}
                        {/* <!-- Start Col --> */}
                        <div className="col-lg-4 col-md-6 col-xs-12 blog-item">
                            {/* <!-- Blog Item Starts --> */}
                            <div className="blog-item-wrapper">
                                <div className="blog-item-img">
                                    <a href="single-post.html">
                                        <img src={Blog4} className="img-fluid" alt="" />
                                    </a>
                                </div>
                                <div className="blog-item-text">
                                    <h3><a href="single-post.html">Unlock new horizons for your business  <br />with the click of a button</a></h3>
                                    <p>Transitioning your operations online is now smoother than ever. Effortlessly expand your reach, showcase your products or services 24/7, and engage with customers from around the world. Seamlessly manage orders, payments, and inventory while tapping into the world of digital marketing. The journey to online success is simple and filled with possibilities.</p>
                                    <a href className="read-more">5 Min read</a>
                                </div>
                                <div className="author">
                                    <span className="name"><i className="lni-user"></i><a href>Posted by Admin</a></span>
                                    <span className="date float-right"><i className="lni-calendar"></i><a href>10 April, 2023</a></span>
                                </div>
                            </div>
                            {/* <!-- Blog Item Wrapper Ends--> */}
                        </div>
                        {/* <!-- End Col --> */}

                    </div>
                    {/* <!-- End Row --> */}
                </div>
            </section>
            {/* <!-- blog Section End --> */}

            {/* <!-- Contact Us Section --> */}
            <section id="contact" className="section">
                {/* <!-- Container Starts --> */}
                <div className="container">
                    {/* <!-- Start Row --> */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="contact-text section-header text-center">
                                <div>
                                    <h2 className="section-title">Get In Touch</h2>
                                    <div className="desc-text">
                                        <p>Have a question, idea, or just want to chat? We're here to listen and collaborate. </p>
                                        <p>Our team is ready to assist you on your journey. Whether you're seeking answers, exploring partnership opportunities, or simply want to say hello, don't hesitate to reach out.</p>
                                        <p>Your message matters to us, and we're excited to start the conversation!</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <!-- End Row --> */}
                    {/* <!-- Start Row --> */}
                    <div className="row">
                        {/* <!-- Start Col --> */}
                        <div className="col-lg-6 col-md-12">
                            <form id="contactForm">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="name" name="name" placeholder="Name" required data-error="Please enter your name" />
                                            <div className="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" placeholder="Subject" id="msg_subject" className="form-control" name="msg_subject" required data-error="Please enter your subject" />
                                            <div className="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="email" name="email" placeholder="Email" required data-error="Please enter your Email" />
                                            <div className="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" placeholder="Budget" id="budget" className="form-control" name="budget" required data-error="Please enter your Budget" />
                                            <div className="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <textarea className="form-control" id="message" name="message" placeholder="Write Message" rows="4" data-error="Write your message" required></textarea>
                                            <div className="help-block with-errors"></div>
                                        </div>
                                        <div className="submit-button">
                                            <button className="btn btn-common" id="submit" type="submit">Submit</button>
                                            <div id="msgSubmit" className="h3 hidden"></div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* <!-- End Col --> */}
                        {/* <!-- Start Col --> */}
                        <div className="col-lg-1">

                        </div>
                        {/* <!-- End Col --> */}
                        {/* <!-- Start Col --> */}
                        <div className="col-lg-4 col-md-12">
                            <div className="contact-img">
                                <img src={Contact1} className="img-fluid" alt="" />
                            </div>
                        </div>
                        {/* <!-- End Col --> */}
                        {/* <!-- Start Col --> */}
                        <div className="col-lg-1">
                        </div>
                        {/* <!-- End Col --> */}

                    </div>
                    {/* <!-- End Row --> */}
                </div>
            </section>
            {/* <!-- Contact Us Section End --> */}

            {/* <!-- Footer Section Start --> */}
            <footer>
                {/* <!-- Footer Area Start --> */}
                <section id="footer-Content">
                    <div className="container">
                        {/* <!-- Start Row --> */}
                        <div className="row">

                            {/* <!-- Start Col --> */}
                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 col-mb-12">

                                <div className="footer-logo">
                                    <img src="img/footer-logo.png" alt="" />
                                </div>
                            </div>
                            {/* <!-- End Col --> */}
                            {/* <!-- Start Col --> */}
                            <div className="col-lg-2 col-md-6 col-sm-6 col-xs-6 col-mb-12">
                                <div className="widget">
                                    <h3 className="block-title">Company</h3>
                                    <ul className="menu">
                                        <li><a href>  - About Us</a></li>
                                        <li><a href>- Career</a></li>
                                        <li><a href>- Blog</a></li>
                                        <li><a href>- Press</a></li>
                                    </ul>
                                </div>
                            </div>
                            {/* <!-- End Col --> */}
                            {/* <!-- Start Col --> */}
                            <div className="col-lg-2 col-md-6 col-sm-6 col-xs-6 col-mb-12">
                                <div className="widget">
                                    <h3 className="block-title">Product</h3>
                                    <ul className="menu">
                                        <li><a href>  - Customer Service</a></li>
                                        <li><a href>- Enterprise</a></li>
                                        <li><a href>- Price</a></li>
                                        <li><a href>- Scurity</a></li>
                                        <li><a href>- Why SLICK?</a></li>
                                    </ul>
                                </div>
                            </div>
                            {/* <!-- End Col --> */}
                            {/* <!-- Start Col --> */}
                            <div className="col-lg-2 col-md-6 col-sm-6 col-xs-6 col-mb-12">
                                <div className="widget">
                                    <h3 className="block-title">Download App</h3>
                                    <ul className="menu">
                                        <li><a href>  - Android App</a></li>
                                        <li><a href>- IOS App</a></li>
                                        <li><a href>- Windows App</a></li>
                                        <li><a href>- Play Store</a></li>
                                        <li><a href>- IOS Store</a></li>
                                    </ul>
                                </div>
                            </div>
                            {/* <!-- End Col --> */}
                            {/* <!-- Start Col --> */}
                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 col-mb-12">
                                <div className="widget">
                                    <h3 className="block-title">Subscribe Now</h3>
                                    <p>Appropriately implement calysts for change visa wireless catalysts for change. </p>
                                    <div className="subscribe-area">
                                        <input type="email" className="form-control" placeholder="Enter Email" />
                                        <span><i className="lni-chevron-right"></i></span>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- End Col --> */}
                        </div>
                        {/* <!-- End Row --> */}
                    </div>
                    {/* <!-- Copyright Start  --> */}

                    <div className="copyright">
                        <div className="container">
                            {/* <!-- Star Row --> */}
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="site-info text-center">
                                        <p>Crafted by <a href="http://uideck.com" rel="nofollow">UIdeck</a></p>
                                    </div>

                                </div>
                                {/* <!-- End Col --> */}
                            </div>
                            {/* <!-- End Row --> */}
                        </div>
                    </div>
                    {/* <!-- Copyright End --> */}
                </section>
                {/* <!-- Footer area End --> */}

            </footer>
            {/* <!-- Footer Section End -->  */}

            {/* <!-- Go To Top Link --> */}
            <a href className="back-to-top">
                <i className="lni-chevron-up"></i>
            </a>

            {/* <!-- Preloader --> */}
            {/* <div id="preloader">
                <div className="loader" id="loader-1"></div>
            </div> */}
            {/* <!-- End Preloader --> */}
        </div>
    );
}

export default Index;