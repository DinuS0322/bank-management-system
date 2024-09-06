<?php
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

require_once 'config.php';

if (!isset($_SESSION['SESS_USER_ID'])) {
	header('Location: logout.php');
}
// CSRF Protection
if (strtoupper($_SERVER['REQUEST_METHOD']) === 'GET') {
	$_SESSION['CSRF_TOKEN'] =  md5(uniqid(mt_rand(), true));
}
// CSRF Protection
$SESS_USER_ID = $_SESSION['SESS_USER_ID'];
$SESS_USER_TYPE = $_SESSION['SESS_USER_TYPE'];
$SESS_USER_NAME = $_SESSION['SESS_USER_NAME'];
$SESS_USER_EMAIL = $_SESSION['SESS_USER_EMAIL'];
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="Demo Site">
	<meta name="author" content="Demo Site">
	<link rel="icon" href="favicon.ico">
	<title>Bank System</title>

	<!-- Custom fonts for this template-->
	<link href="css/googleFonts.css" rel="stylesheet" type="text/css">
	<link href="source/fontawesome-free/css/all.min.css" rel="stylesheet">
	<link href="source/layout/assets/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
	<link href="source/layout/assets/boxicons/css/boxicons.min.css" rel="stylesheet">
	<link href="source/layout/assets/remixicon/remixicon.css" rel="stylesheet">
	<!-- Custom fonts for this template-->

	<!-- Bootsrap CSS -->
	<link href="source/layout/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
	<link href="source/layout/css/style.css" rel="stylesheet">
	<!-- Bootsrap CSS -->

	<link href="https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap5.min.css" rel="stylesheet">

	<!-- Confirm Js CSS -->
	<link href="source/confirm/confirm.min.css" rel="stylesheet">

	<!-- Selectize CSS -->
	<link href="source/selectize/css/selectize.bootstrap5.css" rel="stylesheet">

	<!-- Country Select CSS -->
	<link href="source/country-select/css/countrySelect.css" rel="stylesheet">



	<!-- Telephone Select CSS -->
	<link href="source/telephone-select/css/intlTelInput.css" rel="stylesheet">

	<!--Custom CSS File Add-->
	<link href='css/custom.css' rel='stylesheet' />
	<!--Custom CSS File Add-->

	<!-- Custom fonts for this template-->
	<link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

	<!-- Custom styles for this template-->
	<link href="css/sb-admin-2.min.css" rel="stylesheet">

</head>

<body>

	<!-- ======= Header ======= -->
	<?php include 'include/top-bar.php'; ?>
	<!-- ======= End Header =======  -->

	<!-- ======= Sidebar ======= -->
	<?php include 'include/side-bar-new.php'; ?>
	<!-- End Sidebar-->

	<!-- View Modal -->
	<?php include 'pages/default-settings-modal.php'; ?>
	<!-- View Modal -->

	<!-- Main JS Files -->
	<script src="source/layout/assets/apexcharts/apexcharts.min.js"></script>
	<script src="source/layout/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
	<script src="source/jquery/jquery.min.js"></script>
	<script src="source/jquery-easing/jquery.easing.min.js"></script>
	<script src="source/layout/assets/chart.js/chart.min.js"></script>
	<script src="source/layout/assets/echarts/echarts.min.js"></script>
	<script src='js/moment.min.js'></script>
	<script src="source/layout/js/main.js"></script>
	<!-- Main JS Files -->


	<!-- Confirm JS -->
	<script src="source/confirm/confirm.min.js"></script>

	<!-- Selectize JS -->
	<script src="source/selectize/js/standalone/selectize.js"></script>

	<!-- Country Select JS -->
	<script src="source/country-select/js/countrySelect.js"></script>

	<script src="js/sb-admin-2.min.js"></script>

	<!-- Bootstrap core JavaScript-->
	<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script>

	<!-- Page level plugins -->
	<script src="source/datatables/datatables.min.js"></script>
	<script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>

	<!-- Page level custom scripts -->
	<script src="js/custom/datatables-demo.js"></script>

	<!-- Page level plugins -->
	<script src="vendor/chart.js/Chart.min.js"></script>

	<!-- Page level custom scripts -->
	<script src="js/custom/chart-area-demo.js"></script>
	<script src="js/custom/chart-pie-demo.js"></script>


	<!-- Telephone Select JS -->
	<script src="source/telephone-select/js/intlTelInput.js"></script>

	<!-- Custom JS -->
	<script src='js/custom/custom-functions.js?v=<?= date('s'); ?>'></script>
	<!-- Custom JS -->

	<!--Loaders-->
	<div id="loader">
		<div class="load-spinner">
			<span class="spinner"></span>
		</div>
	</div>
	<!--Loaders-->

	<main id="main" class="main">
		<div class="container-fluid">
			<?php
			if (isset($_GET['page'])) {
				$page = filter_var($_GET['page'], FILTER_SANITIZE_URL);
				if (file_exists("pages/$page.php")) {
					//$access	= $LMS->authorization($userType, $userId, $page);
					$access = true;
					if ($access == true) {
						include("pages/$page.php");
						//Want to add log function
					} else {
						include("404.php");
					}
				} else {
					include("404.php");
				}
			} else {
				include("pages/dashboard.php");
			}
			?>
		</div>
	</main>
	<!-- CSRF Protection -->
	<input type="hidden" name="CSRF_TOKEN" id="CSRF_TOKEN" value="<?= isset($_SESSION['CSRF_TOKEN']) ? $_SESSION['CSRF_TOKEN'] : '' ?>">
	<!-- CSRF Protection -->
</body>

</html>