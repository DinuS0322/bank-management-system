<?php
require_once 'config.php';
// CSRF Protection
if (strtoupper($_SERVER['REQUEST_METHOD']) === 'GET') {
    $_SESSION['CSRF_TOKEN'] =  md5(uniqid(mt_rand(), true));
}
// CSRF Protection
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bank System</title>

    <!-- Custom fonts for this template-->
    <link href="css/googleFonts.css" rel="stylesheet" type="text/css">
    <link href="source/fontawesome-free/css/all.min.css" rel="stylesheet">
    <!-- Custom fonts for this template-->

    <!-- Bootsrap CSS -->
    <link href="source/layout/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Confirm Js CSS -->
    <link href="source/confirm/confirm.min.css" rel="stylesheet">

    <!-- Login CSS -->
    <link href="css/login.css?v=<?= $cashClear ?>" rel="stylesheet">

    <!--Custom CSS File Add-->
    <link href='css/custom.css?v=<?= $cashClear ?>' rel='stylesheet' />
</head>
<style>
    #loginLogo {
        height: 250px;
        width: 250px;
    }
</style>

<body>
    <section class="container-fluid ">
        <div id="layoutAuthentication">
            <div class="row ">
                <div class="col mt-5">
                    <div class="row d-flex justify-content-center">
                        <img src="images/login-logo.png" alt="" id="loginLogo">
                    </div>
                    <div class="row-4 d-flex justify-content-center mt-3">
                        <h2 class="badge bg-success text-uppercase"> Vission</h2>
                    </div>
                    <div class="row-4 d-flex justify-content-center mt-3 text-light fw-bold">
                        A Fully Developed Sri Lanka
                    </div>
                    <div class="row-4 d-flex justify-content-center mt-3 ">
                        <h2 class="badge bg-success text-uppercase"> Mission</h2>
                    </div>
                    <div class="row-4 d-flex justify-content-center mt-3 text-light fw-bold">
                        A Fully Developed Sri Lanka
                    </div>
                </div>

                <div class="col">
                    <div class="row vh-100">
                        <div class="row d-flex justify-content-center mt-5">
                            <div class="col-10">
                                <div class="card shadow">
                                    <div class="card-body">
                                        <div class="px-4 sign-container mx-auto">
                                            <div class="text-center mt-5">
                                                <h5 class="fw-bold brand my-3">Sign in to Account</h5>
                                                <div class="mb-2 mx-auto signin-border"></div>



                                                <!--Sign In Form-->
                                                <div class="position-relative my-4">
                                                    <input class="form-control inputbox shadow-none p-2 no-space" type="email" id="txtLoginEmail" placeholder="email@.com">
                                                    <div class="input-label position-absolute  px-2 bg-white z-1">
                                                        <label for="email" class="control-label">Email</label>
                                                    </div>
                                                </div>

                                                <div class="position-relative my-5">
                                                    <input class="form-control inputbox shadow-none p-2 no-space" type="password" id="txtLoginPassword" placeholder="Password">
                                                    <div class="input-label position-absolute px-2 bg-white z-1">
                                                        <label for="email" class="control-label">Password</label>
                                                    </div>
                                                </div>

                                                <!-- <div class="d-flex justify-content-center align-items-center  mx-auto">

                                            <a href="#" class="text-reset text-decoration-none fw-bold">Forgot Password?</a>
                                        </div> -->

                                                <button class="btn my-5 fw-bold btn-lg sign-up rounded-5 px-5 fs-6" id="btnLogin">Sign In</button>
                                                <!--Sign In Form-->

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    </section>

    <!-- CSRF Protection -->
    <input type="hidden" id="CSRF_TOKEN" value="<?= isset($_SESSION['CSRF_TOKEN']) ? $_SESSION['CSRF_TOKEN'] : '' ?>">
    <!-- CSRF Protection -->

    <!--Loaders-->
    <div id="loader">
        <div class="load-spinner">
            <span class="spinner"></span>
        </div>
    </div>
    <!--Loaders-->

    <!-- Main JS Files -->
    <script src="source/jquery/jquery.min.js"></script>

    <!-- Bootsrap JS -->
    <script src="source/layout/assets/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Confirm JS -->
    <script src="source/confirm/confirm.min.js"></script>

    <!-- Custom JS -->
    <script src='js/custom/custom-functions.js?v=<?= $cashClear ?>'></script>
    <script src="js/custom/login.js?v=<?= $cashClear ?>"></script>

</body>

</html>