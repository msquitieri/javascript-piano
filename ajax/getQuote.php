<?php

class FinanceAPIException extends Exception {}

function convertBase($val, $from, $to) {
	return base_convert($val, $from, $to);
}

function encodeURIComponent($toEncode) {
	$revert = array('%21'=>'!', '%2A'=>'*', '%27'=>"'", '%28'=>'(', '%29'=>')');
	return strtr(rawurlencode($toEncode), $revert);
}

function decodeJSON($json) {
	$isAssociativeArray = true;
	return json_decode($json, $isAssociativeArray);
}

function sendYahooRequestWithTicker($ticker) {
	$query = "SELECT * from yahoo.finance.quotes where symbol in (\"$ticker\")";
	$query = encodeURIComponent($query);

	$url = "http://query.yahooapis.com/v1/public/yql?q=$query&format=json&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback=";

	return file_get_contents($url);
}

function getQuote($ticker="") {
	if (strcmp($ticker, "") == 0) throw new FinanceAPIException("ticker is null!");

	$content = sendYahooRequestWithTicker($ticker);

	$json = decodeJSON($content);
	return $json["query"]["results"]["quote"];
}

function getPitchFromInt($pitchInt) {
	if (strcmp($pitchInt, "a") == 0) return 10;
	if (strcmp($pitchInt, "b") == 0) return 11;
	return intval($pitchInt);
}

function convertToPitchArray($base12) {
	$string = strval($base12);
	
	$array = array();
	for ($i=0; $i<strlen($string); $i++) {
		$pitchInt = substr($string, $i, 1);
		$pitch = getPitchFromInt($pitchInt);
		array_push($array, $pitch);
	}
	return $array;
}

function convertToMusic($number) {
	/*echo "NUMBER: $number";
	echo "\n\n\nBASE12: $base12";*/
	$base16 = md5($number);
	//$base12 = convertBase($number, 10, 12);
	$base12 = convertBase($base16, 16, 12);

	$array = convertToPitchArray($base12);

	return $array;
}

header ("Content-type: application/json");

$ticker = $_REQUEST["ticker"];
if ($ticker == NULL) $ticker = "AAPL";

/*
$data = getQuote($ticker);
$price = $data["Ask"];
*/

$price = rand(1000000, getrandmax());

$json = array();
$json["code"] = 200;
$json["response"] = convertToMusic($price);
//$json["response"] = convertToMusic(pi());

echo json_encode($json);
?>
