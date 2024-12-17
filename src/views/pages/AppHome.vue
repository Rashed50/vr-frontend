<template>
    <div>

        <!-- Nave Section -->
        <nav class="custom-navbar">
            <div class="container">
                <ul class="nav justify-content-center">
                    <li class="nav-item">
                        <a class="nav-link" href="#">HOME</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">SEND MESSAGE</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">ABOUT</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">CONTACT US</a>
                    </li>
                    <li class="nav-item" v-if="authenticated">
                        <a class="nav-link" href="#">DASHBOARD</a>
                    </li>
                    <li class="nav-item" v-else="authenticated">
                        <a class="nav-link" href="/login">LOGIN</a>
                    </li>
                </ul>
            </div>
        </nav>


        <!-- Features Section -->
        <div class="features-section" style="margin-top: 200px;">
            <div class="container py-5">
                <div class="row g-4 justify-content-center">
                    <!-- Card 1 -->
                    <div class="col-md-4">
                        <div class="card h-100">
                            <img src="https://via.placeholder.com/400x250" alt="Cognitive 3D" class="card-img-top" />
                            <div class="card-body">
                                <h5 class="card-title">Why Cognitive 3D</h5>
                                <p class="card-text">
                                    Explore beyond traditional web and mobile analytics. Dive into
                                    detailed user interactions specific to 3D, VR, and AR
                                    environments, unlocking insights that set your applications
                                    apart.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Card 2 -->
                    <div class="col-md-4">
                        <div class="card h-100">
                            <img src="https://via.placeholder.com/400x250" alt="Seamless Integration"
                                class="card-img-top" />
                            <div class="card-body">
                                <h5 class="card-title">Seamless Integration</h5>
                                <p class="card-text">
                                    Plug our SDK into your Unity or Unreal application with ease.
                                    Compatible across all VR/AR, PC, mobile, and tablet devices. Our
                                    platform collects and analyzes data in the background without
                                    complication.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Card 3 -->
                    <div class="col-md-4">
                        <div class="card h-100">
                            <img src="https://via.placeholder.com/400x250" alt="Transform Insights"
                                class="card-img-top" />
                            <div class="card-body">
                                <h5 class="card-title">Transform Insights into Action</h5>
                                <p class="card-text">
                                    Transform spatial data into actionable insights. Optimize user
                                    engagement and functionality, driving your product forward with
                                    informed, impactful decisions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Use Cases Section -->
        <div class="use-cases-section">
            <div class="container py-5">
                <div class="row g-4 justify-content-center">
                    <!-- Feature Card 1 -->
                    <div class="col-md-3">
                        <div class="card h-100">
                            <img src="https://via.placeholder.com/400x250" alt="Training Simulation"
                                class="card-img-top" />
                            <div class="card-body">
                                <h5 class="card-title">01 Training Simulation</h5>
                                <p class="card-text">
                                    Measure behavior within immersive 3D experiences to transform spatial data into
                                    actionable insights.
                                    Optimize user engagement and functionality, driving your product forward with
                                    informed, impactful decisions.
                                </p>
                                <a href="#" class="btn btn-outline-primary">READ MORE</a>
                            </div>
                        </div>
                    </div>

                    <!-- Feature Card 2 -->
                    <div class="col-md-3">
                        <div class="card h-100">
                            <img src="https://via.placeholder.com/400x250" alt="Consumer Research"
                                class="card-img-top" />
                            <div class="card-body">
                                <h5 class="card-title">02 Consumer Research</h5>
                                <p class="card-text">
                                    Collect distributed information for CPG, optimize user engagement, and
                                    functionality, driving your product forward with informed, impactful decisions.
                                </p>
                                <a href="#" class="btn btn-outline-primary">READ MORE</a>
                            </div>
                        </div>
                    </div>

                    <!-- Feature Card 3 -->
                    <div class="col-md-3">
                        <div class="card h-100">
                            <img src="https://via.placeholder.com/400x250" alt="Academic Research"
                                class="card-img-top" />
                            <div class="card-body">
                                <h5 class="card-title">03 Academic Research</h5>
                                <p class="card-text">
                                    Transform spatial data into actionable insights. Optimize user engagement and
                                    functionality, driving your product forward with informed, impactful decisions.
                                </p>
                                <a href="#" class="btn btn-outline-primary">READ MORE</a>
                            </div>
                        </div>
                    </div>

                    <!-- Feature Card 4 -->
                    <div class="col-md-3">
                        <div class="card h-100">
                            <img src="https://via.placeholder.com/400x250" alt="Entertainment" class="card-img-top" />
                            <div class="card-body">
                                <h5 class="card-title">04 Entertainment</h5>
                                <p class="card-text">
                                    Transform spatial data into actionable insights. Optimize user engagement and
                                    functionality, driving your product forward with informed decisions for
                                    entertainment.
                                </p>
                                <a href="#" class="btn btn-outline-primary">READ MORE</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <!-- Contact Section -->
        <div class="contact-section">
            <div class="container py-5">
                <div class="row align-items-center">
                    <!-- Contact Form -->
                    <div class="col-md-6">
                        <div class="contact-form">
                            <h2 class="mb-4">GET IN TOUCH</h2>
                            <form>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Name" required />
                                </div>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Phone Number" required />
                                </div>
                                <div class="mb-3">
                                    <input type="email" class="form-control" placeholder="Email" required />
                                </div>
                                <div class="mb-3">
                                    <textarea class="form-control" rows="5" placeholder="Message" required></textarea>
                                </div>
                                <button type="submit" class="btn btn-submit w-100">SEND</button>
                            </form>
                        </div>
                    </div>

                    <!-- Google Map -->
                    <div class="col-md-6 mt-4 mt-md-0">
                        <div class="map-embed">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9997922550213!2d2.2922923156745066!3d48.85837360832873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fbd569b7baf%3A0x8d0b90c48c6e7988!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1631119061700!5m2!1sen!2sfr"
                                width="100%" height="400" style="border: 0" allowfullscreen="" loading="lazy">
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Footer Section -->
        <footer class="custom-footer">

            <div class="container py-5">
                <div class="row">
                    <!-- Subscribe Section -->
                    <div class="col-md-12 text-center mb-4">
                        <h5 class="text-white mb-2">Enter Your Email</h5>
                        <input type="email" class="form-control footer-input mx-auto" placeholder="Your Email">
                        <button class="btn btn-subscribe mt-2">SUBSCRIBE</button>
                    </div>
                </div>
                <div class="row">
                    <!-- Address -->
                    <div class="col-md-3">
                        <h5 class="text-primary">ADDRESS</h5>
                        <ul class="footer-list">
                            <li>📍 Making this the first true</li>
                            <li>📞 Call: +01 1234567890</li>
                            <li>✉ Email: demo@gmail.com</li>
                        </ul>
                        <div class="social-icons">
                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>

                    <!-- Useful Links -->
                    <div class="col-md-3">
                        <h5 class="text-primary">USEFUL LINK</h5>
                        <ul class="footer-list">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">News</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>

                    <!-- Help & Support -->
                    <div class="col-md-3">
                        <h5 class="text-primary">HELP & SUPPORT</h5>
                        <p class="footer-text">
                            Opposed to using 'Content here, content here', making it look like readable English. Many
                            desktop publishing packages and web page
                        </p>
                    </div>

                    <!-- News -->
                    <div class="col-md-3">
                        <h5 class="text-primary">NEWS</h5>
                        <ul class="footer-list">
                            <li>📰 Normal distribution</li>
                            <li>📰 Normal distribution</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="row p-4" style="background-color: aliceblue;">
                <div class="col text-center">
                    <p class="footer-bottom">
                        © 2024 All Rights Reserved. Design by Free Html Templates. Distribution By ThemWagons
                    </p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: "Navbar",
    data() {
        return {
            authenticated: false,
        }
    },
};
</script>

<style scoped>

/* ================================= */
/* ======== Nave Section ======== */
.custom-navbar {
    background: #1e3a3f;
    /* Dark teal background */
    padding: 15px 0;
}

.nav-link {
    color: #ffffff !important;
    /* White text */
    font-weight: 500;
    letter-spacing: 1px;
    transition: color 0.3s ease;
}

.nav-link:hover {
    color: #476ae9;
    /* Light gray on hover */
}




/* ================================= */
/* ======== Features Section ======== */
.features-section {
    background-color: #1e3a3f;
    border-radius: 20px;
    padding: 2rem 0;
    height: auto;
    /* Ensure it's not getting hidden */
    display: block;
    /* Ensure it's rendered */
}

.card {
    border: none;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-title {
    font-weight: 600;
    color: #1e3a3f;
}

.card-text {
    color: #333333;
    font-size: 0.9rem;
}





/* ================================= */
/* ======== Contact Section ======== */
.contact-section {
    background-color: #f9f9f9;
    padding: 50px 0;
}

.contact-form {
    background: #ffffff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-control {
    border-radius: 0.5rem;
}

.btn-submit {
    background-color: #1e3a3f;
    color: #ffffff;
    font-weight: 600;
    border-radius: 0.5rem;
}

.btn-submit:hover {
    background-color: #145359;
}

.map-embed {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
    font-weight: bold;
    color: #1e3a3f;
}




/* ================================= */
/* ========= Footer Section ========= */
.custom-footer {
    background: #111;
    color: #aaa;
    font-size: 0.9rem;
}

.footer-input {
    max-width: 400px;
    border-radius: 0.5rem;
    text-align: center;
}

.btn-subscribe {
    background: #009ecf;
    color: white;
    border-radius: 0.5rem;
    padding: 0.5rem 1.5rem;
}

.text-primary {
    color: #00bcd4 !important;
}

.footer-list {
    list-style: none;
    padding: 0;
}

.footer-list li,
.footer-list a {
    color: #ddd;
    text-decoration: none;
    margin-bottom: 0.5rem;
}

.footer-text {
    color: #ddd;
}

.footer-bottom {
    color: #666;
    font-size: 0.8rem;
}

.social-icons a {
    color: #00bcd4;
    font-size: 1.2rem;
    margin-right: 10px;
}

.social-icons a:hover {
    color: #009ecf;
}
</style>
