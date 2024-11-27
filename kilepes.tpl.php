<?php
// Az MNB árfolyamok lekérdezésének PHP kódja
require_once 'mnb_soap.tpl.php';
?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MNB Árfolyamok</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <h1>MNB Árfolyam Lekérdezés</h1>

    <h2>1. Deviza árfolyam keresése egy adott napon</h2>
    <form method="POST">
        <label for="currencyPair">Devizapár (pl. EURHUF):</label>
        <input type="text" id="currencyPair" name="currencyPair" required>
        <br>
        <label for="date">Dátum (pl. 2024-11-25):</label>
        <input type="date" id="date" name="date" required>
        <br>
        <button type="submit" name="getRate">Lekérdezés</button>
    </form>

    <?php
    if (isset($_POST['getRate'])) {
        $currencyPair = $_POST['currencyPair'];
        $date = $_POST['date'];
        $result = getExchangeRate($currencyPair, $date);
        echo "<h3>Az árfolyam:</h3>";
        echo "<pre>";
        print_r($result);
        echo "</pre>";
    }
    ?>

    <h2>2. Deviza árfolyamok lekérdezése egy adott hónapra</h2>
    <form method="POST">
        <label for="currencyPairMonth">Devizapár (pl. EURHUF):</label>
        <input type="text" id="currencyPairMonth" name="currencyPairMonth" required>
        <br>
        <label for="month">Hónap:</label>
        <input type="number" id="month" name="month" min="1" max="12" required>
        <br>
        <label for="year">Év:</label>
        <input type="number" id="year" name="year" required>
        <br>
        <button type="submit" name="getMonthlyRates">Lekérdezés</button>
    </form>

    <?php
    if (isset($_POST['getMonthlyRates'])) {
        $currencyPairMonth = $_POST['currencyPairMonth'];
        $month = $_POST['month'];
        $year = $_POST['year'];
        $monthlyRates = getMonthlyExchangeRates($currencyPairMonth, $month, $year);
        
        echo "<h3>Az árfolyamok az adott hónapban:</h3>";
        echo "<pre>";
        print_r($monthlyRates);
        echo "</pre>";

        // Grafikon megjelenítése
        echo "<h3>Grafikon</h3>";
        echo '<canvas id="exchangeRateChart" width="400" height="200"></canvas>';
        echo '<script>';
        echo 'var ctx = document.getElementById("exchangeRateChart").getContext("2d");';
        echo 'var chart = new Chart(ctx, {';
        echo '    type: "line",';
        echo '    data: {';
        echo '        labels: ['; 
        // Itt ki kell írni a hónap napjait
        echo '        ],';
        echo '        datasets: [{';
        echo '            label: "Deviza árfolyam",';
        echo '            data: ['; 
        // Itt ki kell írni az árfolyam adatokat
        echo '            ],';
        echo '            borderColor: "rgba(75, 192, 192, 1)",';
        echo '            borderWidth: 1';
        echo '        }]';
        echo '    },';
        echo '    options: {';
        echo '        responsive: true,';
        echo '        scales: {';
        echo '            y: {';
        echo '                beginAtZero: false';
        echo '            }';
        echo '        }';
        echo '    }';
        echo '});';
        echo '</script>';
    }
    ?>

</body>
</html>