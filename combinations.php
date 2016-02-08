<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <?php
        // put your code here
        ?>
        <style>
            /*#listclick {
                width: 40px;
                height: 40px;
                left: 20px;
                top: 20px;
                border: solid;
            }
            */
            #list {
                width: 980px;
                height: 500px;
                left: 60px;
                top: 60px;
                border: solid;
            }
        </style>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
        <script>
            $(document).ready(function () {
                $('#listclick').click(function () {
                    $('#list').toggle(1000);
                });
            });
        </script>
    </head>
    <body>
        <button id="listclick">List of possible combinations</button>
        <!--<div name="listclick" id="listclick">Click for list of possible combinations</div>-->
        <div name="list" id="list" style="display:none">
            The seen hadrons and mesons have a symbol.
            <br>
            <img src="images/Screenshot lijst baryonen.png" alt=""/>
            <img src="images/Screenshot waargenomen mesonen.png" alt=""/>
        </div>

    </body>
</html>




