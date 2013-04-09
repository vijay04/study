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
    <link rel="stylesheet" href="assets/css/local.css" />
    <script src="assets/js/jquery.js"></script>
    <script type="text/javascript">var base_url = '<?php print base_url(); ?>';</script>
    <script src="assets/js/jquery-ui.js"></script>
    <script src="assets/js/local.js"></script>
  </head>

  <body>

    <div id="header-wrap">
    </div><!-- end header wrap -->

    <div class="container">
      <div id="content">
        <section id="post-content" role="main">
          <h2>Autocomplete</h2>
          <form action="" method="post" accept-charset="utf-8">
            <div id="change-slug" class="autocomplete-container">
              <input type="input" name="slug" id="slug"></input><br />
            </div>
            <div>Start typing with "v"</div>
            <input type="hidden" id="slug-id" name="slug-id" />
            <input type="submit" name="submit" value="Create news item" />
          </form>    
        </section>
      </div>
    </div>

    <div id="footer-wrap">
    </div><!-- end footer wrap -->

  </body>

</html>