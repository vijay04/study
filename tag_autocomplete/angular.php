<?php

function base_url() {
  $root = "http://".$_SERVER['HTTP_HOST'];
  $root .= str_replace(basename($_SERVER['SCRIPT_NAME']),"",$_SERVER['SCRIPT_NAME']);
  return $root;  
}


?>

<!doctype html>
<html lang="en">

  <head>
    <title>Autocomplete</title>
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/jquery-ui.css" />
    <link rel="stylesheet" href="assets/css/autocomplete-custom.css" />
    <script src="assets/js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript">var base_url = '<?php print base_url(); ?>';</script>
    <script src="assets/js/jquery-ui.js"></script>
    <script src="assets/js/angular.min.js"></script>
    <script src="assets/js/angular-auto.js"></script>
    <script src="assets/js/angular_local.js"></script>
  </head>

  <body ng-app="tagsAuto">

    <div id="header-wrap">
    </div><!-- end header wrap -->

    <div class="container">
      <div id="content">
        <section id="post-content" role="main">
          <h2>Angular Autocomplete</h2>
          <form action="" method="post" accept-charset="utf-8">
            <div class="row">
            <input id="tags" type="text" class="span12" value="" name="tags" ng-model="tags" uiauto auto-data-url="tags.php">
            <div>Start typing with "v"</div>
            </div>
          </form>    
        </section>
      </div>
    </div>

    <div id="footer-wrap">
    </div><!-- end footer wrap -->

  </body>

</html>