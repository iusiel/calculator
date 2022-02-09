<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator</title>
    <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}" />
</head>
<body>
    <div id="app">
        <calculator></calculator>
    </div>
    <div>
        12 + 12 <br/>
        <b>= 24</b>

        <hr></hr>

        24 - 5 </br>
        <b>= 19</b>
    </div>
    <div>AC</div>
    <div>DELETE</div>
    <div>&divide;</div>
    <div>&times;</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>&minus;</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>&plus;</div>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>%</div>
    <div>0</div>
    <div>.</div>
    <div>=</div>
</body>

<script src="{{ asset('js/app.js') }}"></script>
</html>