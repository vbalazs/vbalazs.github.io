//requestVars start

/*
 * @author      Jesse Berman
 * @copyright   2008-01-31
 * @version     1.0
 * @license     http://www.gnu.org/copyleft/lesser.html
*/


/*
 * Portions by Dieter Raber <dieter@dieterraber.net>
 * copyright   2004-12-27
*/


/* pwa.js: a drop-in JavaScript utility that displays galleries from picasaweb.google.com in your website */


function readGet(){var _GET = new Array();var uriStr  = window.location.href.replace(/&amp;/g, '&');var paraArr, paraSplit;if(uriStr.indexOf('?') > -1){var uriArr  = uriStr.split('?');var paraStr = uriArr[1];}else{return _GET;}if(paraStr.indexOf('&') > -1){paraArr = paraStr.split('&');}else{paraArr = new Array(paraStr);}for(var i = 0; i < paraArr.length; i++){paraArr[i] = paraArr[i].indexOf('=') > -1 ? paraArr[i] : paraArr[i] + '=';paraSplit  = paraArr[i].split('=');_GET[paraSplit[0]] = decodeURI(paraSplit[1].replace(/\+/g, ' '));}return _GET;}var _GET = readGet();
//requestVars end

function resize(which, max) {
// not used anymore! was scaling photos after they were loaded. using browser-native inline scaling instead,
// until google fixes their image size request to work with any imgmax, rather than just 800 :-(
  var elem = document.getElementById(which);
  if (elem == undefined || elem == null) return false;
  if (max == undefined) max = 658;
  if (elem.width > elem.height) {
    if (elem.width > max) elem.width = max;
  } else {
    if (elem.height > max) elem.height = max;
  }
}

//$Update: May 10, 2007$

function $pwa(a){document.write(a);}
var photosize;
if(!photosize){photosize = IMG_MAX_SIZE;}

var columns;
if(!columns || isNaN(columns) || columns < 1) {columns = 4;}


//Global variables
var photolist = new Array(); //this is used globally to store the entire list of photos in a given album, rather than pass the list around in a URL (which was getting rediculously long as a result)
var album_name = ""; //this is used globally to store the album name, so we don't have to pass it around in the URL anymore either.
var my_numpics = ""; //this is used globally to store the number of items in a particular album, so we don't have to pass it around in the URL anymore either.
var prev = ""; //used in the navigation arrows when viewing a single item
var next = "";//used in the navigation arrows when viewing a single item

/**
 * LANGUAGE STRINGS
 */
var LN_GALLERY_HOME = "Albus";
var LN_ITEM = "item";
var LN_ITEM_CAPS = "Item";
var LN_ITEM_PLURAL = "s"; //in english: "s"
var LN_DOWNLOAD = "download";
var LN_PREVIOUS_ITEM = "Previous";
var LN_NEXT_ITEM = "Next";
var LN_BACK_TO_ALBUM_INDEX = "Back to the album";
var LN_PICTURE = "picture";
var LN_PICTURE_CAPS = "picture";
var LN_OF = "of"; //ex. LN_OF = "of" : picture 3 of 4

/**
 * SETTINGS
 */
//if you use lightbox, leave it true
//if you want to display image as a page set it to false
var LIGHTBOX_ENABLED = true;
//image thumbnails's size
var IMG_TH_SIZE = 160;
//image max size in pixels (x or y dimension, the image will resized without distortion)
var IMG_MAX_SIZE = 800;
//crop image to IMG_MAX_SIZE instead of resizing
var IMG_CROP = false;
//for lightbox, colorbox, etc; it will be the 'a' element's rel's value
//ex.: <a href="/img/any.jpg" rel=" <IMG_GROUP_NAME> "><img src="/img/any.jpg" /></a>
var IMG_GROUP_NAME = "myAlbum";
//enable download link
var DL_LINK_ENABLED = true;
//root folder to icons (prev && next && album home)
var ICONS_ROOT = "/sites/all/themes/ezk/images/icons/";
var ICON_NEXT = "nextlabel.gif";
var ICON_PREV = "prevlabel.gif";
var ICON_ALBUM = "album.png";

//escape description. if it contains ' or " or any html element
function htmlEncode(value){
    return $('<div/>').text(value).html()
                  .replace(/\'/, "&#"+("'".charCodeAt()) )
                  .replace(/\"/, "&#"+('"'.charCodeAt()) );
}

//generate download link
function getDownloadURi(feedEntry, img_base) {
    var fileName = feedEntry.media$group.media$title.$t;
    return img_base.substr(0, img_base.lastIndexOf('/')) + '/d/' + fileName ;
}

function picasaweb(j){ //returns the list of all albums for the user
 $pwa("<div style='margin-left:3px'>" + LN_GALLERY_HOME + "</div><br>");
 $pwa("<table class='imageGrid'><tr>");

 for(i=0;i<j.feed.entry.length;i++){

 // for each of the albums in the feed, grab its album cover thumbnail and the link to that album,
 // then display them in a table with 4 columns (along with the album title)

  //This was the old way of grabbing the photos; since Google updated the feed, the media entry is better. :-)
  //
  //var img_begin = j.feed.entry[i].summary.$t.indexOf('src="')+5;
  //var img_end = j.feed.entry[i].summary.$t.indexOf('?imgmax');
  //var img_base = j.feed.entry[i].summary.$t.slice(img_begin, img_end);

  var img_base = j.feed.entry[i].media$group.media$content[0].url;

  var id_begin = j.feed.entry[i].id.$t.indexOf('albumid/')+8;
  var id_end = j.feed.entry[i].id.$t.indexOf('?');
  var id_base = j.feed.entry[i].id.$t.slice(id_begin, id_end);

  var unescapedLongTitle = j.feed.entry[i].title.$t;
  var escapedShortTitle = "";
  //cut title before encode to prevent unexpected [converted] entities
  if (unescapedLongTitle.length > 23)
    escapedShortTitle = htmlEncode( unescapedLongTitle.substr(0, 23) + "..." );
  else
    escapedShortTitle = htmlEncode( unescapedLongTitle );

  $pwa("<td valign='top'><a class='standard' href='?albumid="+id_base+"'><img src='"+img_base+"?imgmax="+IMG_TH_SIZE+"&crop=1' class='pwimages' /></a>");
  $pwa("<br><center><a class='standard' href='?albumid="+id_base+"'>"+ escapedShortTitle +"</a></center></td>");
  if (i % columns == columns-1) {
    $pwa("</tr> <tr>");
  }
 }
 $pwa("</tr></table>");
 
}





function getphotolist(j){

// This function is called just before displaying an item; it returns info about the item's current state within its parent
// album, such as the name of the album it's in, the index of the photo in that album, and the IDs of the previous and next
// photos in that album (so we can link to them using navigation arrows).  This way we don't have to pass state information
// around in the URL, which was resulting in hellishly long URLs (sometimes causing "URI too long" errors on some servers).

// Get the number of pictures in the album.  Added 7/18/2007.
 my_numpics = j.feed.openSearch$totalResults.$t;

// Also get the name of the album, so we don't have to pass that around either.  Added 7/18/2007.
 album_name = j.feed.title.$t;

 for(i=0;i<j.feed.entry.length;i++){
  // get the list of all photos referenced in the album and display;
  // also stored in an array (photoids) for navigation in the photo view (passed via the URL)
  var id_begin = j.feed.entry[i].id.$t.indexOf('photoid/')+8;
  var id_end = j.feed.entry[i].id.$t.indexOf('?');
  var id_base = j.feed.entry[i].id.$t.slice(id_begin, id_end);
  photolist[i]=id_base;

  // now get previous and next photos relative to the photo we're currently viewing
  if (i>0)
  {
    var prev_begin = j.feed.entry[i-1].id.$t.indexOf('photoid/')+8;
    var prev_end = j.feed.entry[i-1].id.$t.indexOf('?');
    prev = j.feed.entry[i-1].id.$t.slice(id_begin, id_end);
  }
  if (i<j.feed.entry.length-1)
  {
    var next_begin = j.feed.entry[i+1].id.$t.indexOf('photoid/')+8;
    var next_end = j.feed.entry[i+1].id.$t.indexOf('?');
    next = j.feed.entry[i+1].id.$t.slice(id_begin, id_end);
  }

 }
}




function albums(j){  //returns all photos in a specific album

 //get the number of photos in the album
 var np = j.feed.openSearch$totalResults.$t;
 var item_plural = LN_ITEM_PLURAL;
 if (np == "1") {item_plural = "";}

 var album_begin = j.feed.entry[0].summary.$t.indexOf('href="')+6;
 var album_end = j.feed.entry[0].summary.$t.indexOf('/photo#');
 var album_link = j.feed.entry[0].summary.$t.slice(album_begin, album_end);
 var photoids = new Array();

 $pwa("<div style='margin-left:3px'><a class='standard' href='" + window.location.protocol + "//" + window.location.hostname+window.location.pathname+"'>" + LN_GALLERY_HOME + "</a> &gt; "+ j.feed.title.$t +"&nbsp;&nbsp;["+np+" " + LN_ITEM + item_plural + "]</div><br>");
 $pwa("<table class='imageGrid' border='0'><tr>");

 for(i=0;i<j.feed.entry.length;i++){

  //var img_begin = j.feed.entry[i].summary.$t.indexOf('src="')+5;
  //var img_end = j.feed.entry[i].summary.$t.indexOf('?imgmax');
  //var img_base = j.feed.entry[i].summary.$t.slice(img_begin, img_end);

  var img_base = j.feed.entry[i].media$group.media$content[0].url;

  var id_begin = j.feed.entry[i].id.$t.indexOf('photoid/')+8;
  var id_end = j.feed.entry[i].id.$t.indexOf('?');
  var id_base = j.feed.entry[i].id.$t.slice(id_begin, id_end);
  photoids[i]=id_base;
  

  // display the thumbnail (in a table) and make the link to the photo page, including the gallery name so it can be displayed.
  // (apparently the gallery name isn't in the photo feed from the Picasa API, so we need to pass it as an argument in the URL) - removed the gallery name 7/18/2007
  var link_url = "?albumid="+_GET['albumid']+"&photoid="+id_base; //+"&photoids="+photoids;
  // disable the navigation entirely for really long URLs so we don't hit against the URL length limit.
  // note: this is probably not necessary now that we're no longer passing the photoarray inside the URL. 7/17/2007
  // Not a bad idea to leave it in, though, in case something goes seriously wrong and we need to revert to that method.
  if (link_url.length > 2048) {link_url = link_url.slice(0, link_url.indexOf('&photoids=')+10)+id_base;}

  var desc = htmlEncode(j.feed.entry[i].media$group.media$description.$t.toString());

  var dlElement = "";
  if (DL_LINK_ENABLED)
      dlElement = " (<a href=\""+getDownloadURi(j.feed.entry[i], img_base)+"\">" + LN_DOWNLOAD + "</a>)";

  var targetUri = "";
  var relValue = "";
  if (LIGHTBOX_ENABLED) {
      targetUri = img_base+"?imgmax="+IMG_MAX_SIZE;
      relValue = IMG_GROUP_NAME;
      if (IMG_CROP)
          targetUri += "&crop=1";
  } else {
      targetUri = link_url;
      dlElement = "";
  }

  $pwa("<td valign='top'><a rel='" + relValue + "' href='"+ targetUri +"' title='"+desc+dlElement+"'><img src='"+img_base+"?imgmax="+IMG_TH_SIZE+"&crop=1' class='pwimages' /></a>");
  $pwa("</td>");

  if (i % columns == columns-1) {
    $pwa("</tr><tr>");
  }
 }
 $pwa("</tr></table>");

}
function photo(j){//returns exactly one photo


 var album_begin = j.entry.summary.$t.indexOf('href="')+6;
 var album_end = j.entry.summary.$t.indexOf('/photo#');
 var album_link = j.entry.summary.$t.slice(album_begin, album_end);

 var img_title = j.entry.title.$t;

 //get the dimensions of the photo we're grabbing; if it's smaller than our max width, there's no need to scale it up.
 var img_width = j.entry.media$group.media$content[0].width;
 var img_height = j.entry.media$group.media$content[0].height;


 var img_base = j.entry.media$group.media$content[0].url;


 // is this a video? If so, we will display that in the breadcrumbs below.
 var is_video = 0;
 if (j.entry.media$group.media$content.length > 1)
 {
   //$('This is a '+j.entry.media$group.media$content[1].medium+'.<br>');
   if (j.entry.media$group.media$content[1].medium == "video")
   {
	   is_video = 1;
   }
 }

 
 var photo_begin = j.entry.summary.$t.indexOf('href="')+6;
 var photo_end = j.entry.summary.$t.indexOf('"><img');
 var photo_link = j.entry.summary.$t.slice(photo_begin, photo_end);
 var photo_id = _GET['photoid'];

 //album name is now taken from the global variable instead. 7/18/2007
 //
 //var album_name_begin = j.entry.summary.$t.indexOf(username)+username.length+1;
 //var album_name_end = j.entry.summary.$t.indexOf('/photo#');
 //var album_name = j.entry.summary.$t.slice(album_name_begin, album_name_end);

 var album_id = _GET['albumid'];
 var my_next = next;
 var my_prev = prev;
 var photo_array = photolist;
 //var my_numpics = _GET['np'];
 //instead, we now get this through the global variable my_numpics. 7/18/2007

 //$("photo ids: "+_GET['photoids']+".<br><br>");
 //$("photolist: "+photo_array+".<br><br>");

 //var my_galleryname = _GET['galleryname'];
 //var my_fixed_galleryname = my_galleryname.slice(1, my_galleryname.length-1);
 var my_galleryname = album_name;
 var my_fixed_galleryname = album_name;
 var album_base_path = window.location.protocol + "//" + window.location.hostname+window.location.pathname +"?albumid="+ _GET['albumid'];

 // Get the filename for display in the breadcrumbs
 var LastSlash = 0;
 var img_filename = img_title;
 for(i=0;i<img_base.length-1;i++){
  if (img_base.charAt(i)=="/")
  {
	  LastSlash = i;
  }
 }
 if (LastSlash != 0)
 {
	 img_filename = img_base.slice(LastSlash+1, img_base.length);
 }
 // replace some commonly-used URL characters like %20
 img_filename = img_filename.replace("%20"," ");
 img_filename = img_filename.replace("%22","\"");
 img_filename = img_filename.replace("%27","\'");


//find preceding two and following two pictures in the array; used for the navigation arrows.
//the arrows are already linked to the previous and next pics, which were passed in with the URL.
//however, we need the ones that are two behind and two ahead so that we can pass that info along when we link to another photo.
//
//NOTE: as of 7/16/2007, the photo array is taken from global photolist (loaded in the getphotolist function) rather than from the URL.
//This has eliminated the need for really long URLs, which were hitting up against the URL length limit in some extreme cases.
for(i=0;i<photo_array.length;i++){
 if (photo_array[i]==photo_id)
 {
	 var p1 = photo_array[i-1]; //ID of the picture one behind this one; if null, we're at the beginning of the album
	 var current_index = i + 1; //this is the count of the current photo
	 var n1 = photo_array[i+1]; //ID of the picture one ahead of this one; if null, we're at the end of the album
 }
}
//these will be passed along if we move to the next or previous photo - removed the gallery name 7/18/2007
//var prev = album_base_path + "&photoid=" + p1 + "&np=" + my_numpics + "&galleryname=" + my_galleryname.replace("'","%27") + "&prev="+p2+ "&next="+photo_id; //+"&photoids="+photo_array;
//var next = album_base_path + "&photoid=" + n1 + "&np=" + my_numpics + "&galleryname=" + my_galleryname.replace("'","%27") + "&prev="+photo_id+ "&next="+n2; //+"&photoids="+photo_array;
var prev = album_base_path + "&photoid=" + p1; //+"&photoids="+photo_array;
var next = album_base_path + "&photoid=" + n1; //+"&photoids="+photo_array;


//Display the breadcrumbs
var my_item_plural = "";
if (my_numpics != 1)
{
	my_item_plural = LN_ITEM_PLURAL;
}
var item_label = LN_PICTURE;
var item_label_caps = LN_PICTURE_CAPS;
if (is_video == 1) //if it's a video, don't say it's a picture, say it's an "item" instead
{
	item_label = LN_ITEM;
	item_label_caps = LN_ITEM_CAPS;
}
//if (photo_array.length == 1) { var current_index_text = "Total of " + my_numpics + " " + item_label + my_item_plural; } else { var current_index_text = item_label_caps + " " + current_index + " of " + my_numpics; }
var current_index_text = item_label_caps + " " + current_index + " " + LN_OF + " " + my_numpics;
if (is_video == 1) {current_index_text = current_index_text + "&nbsp;&nbsp;[VIDEO]";}  //show in the breadcrumbs that the item is a video
$pwa("<div style='margin-left:3px'><a class='standard' href='"+ window.location.protocol + "//" + window.location.hostname+window.location.pathname+"'>" + LN_GALLERY_HOME + "</a> &gt; <a class='standard' href='" + album_base_path + "'>" + my_fixed_galleryname + "</a> &gt; <!--" + img_filename + "-->" + current_index_text + "</div><br>");


if (p1 == null) //we're at the first picture in the album; going back takes us to the album index
  {var prev = album_base_path}

if (n1 == null) //we're at the last picture in the album; going forward takes us to the album index
  {var next = album_base_path}

 //the navigation panel: back, home, and next.
 $pwa("<center><table border='0'><tr valign='top'>");
 if (photo_array.length > 1) {$pwa("<td><a class='standard' href='"+prev+"'><img border=0 alt='" + LN_PREVIOUS_ITEM + "' src='"+ICONS_ROOT+ICON_PREV+"'></a> </td><td></td>");}
 $pwa("<td> <a class='standard' href='"+album_base_path+"'><img border=0 alt='" + LN_BACK_TO_ALBUM_INDEX + "' src='"+ICONS_ROOT+ICON_ALBUM+"'></a> </td>");
 if (photo_array.length > 1) {$pwa("<td></td><td> <a class='standard' href='"+next+"'><img border=0 alt='" + LN_NEXT_ITEM + "' src='"+ICONS_ROOT+ICON_NEXT+"'></a></td>");}
 $pwa("</tr></table></center><br>");

 var max_width = 658; //max width for our photos
 var display_width = max_width;
 if (img_width < display_width)
   {display_width = img_width;} //don't scale up photos that are narrower than our max width; disable this to set all photos to max width

 //at long last, display the image and its description. photos larger than max_width are scaled down; smaller ones are left alone
 var escapedDescription = htmlEncode(j.entry.media$group.media$description.$t);

 var dlElement = "";
 if (DL_LINK_ENABLED)
     dlElement = " (<a href=\""+getDownloadURi(j.entry, img_base)+"\">" + LN_DOWNLOAD + "</a>)";

 $pwa("<center><img id='picture' width="+display_width+" src='"+img_base+"?imgmax="+photosize+"' class='pwimages' /></center>");
 $pwa("<br><center><div style='margin-left:2px'>"+escapedDescription+dlElement+"</div></center></p>");


 //now we will trap left and right arrow keys so we can scroll through the photos with a single keypress ;-) JMB 7/5/2007
 $pwa('<script language="Javascript"> function testKeyCode( evt, intKeyCode ) { if ( window.createPopup ) return evt.keyCode == intKeyCode; else return evt.which == intKeyCode; } document.onkeydown = function ( evt ) { if ( evt == null ) evt = event; if ( testKeyCode( evt, 37 ) ) { window.location = "' + prev + '"; return false; } if ( testKeyCode( evt, 39 ) ) { window.location = "' + next + '"; return false; } } </script>');


 // an attempt at resampling the photo, rather than relying on the browser's internal resize function. doesn't work, unfortunately.
 //
 //$pwa("<?php $filename='"+img_base+"?imgmax="+photosize+"'; $width = 658; $height = 1600; list($width_orig, $height_orig) = getimagesize($filename); ");
 //$pwa("$ratio_orig = $width_orig/$height_orig; if ($width/$height > $ratio_orig) { $width = $height*$ratio_orig; } else { $height = $width/$ratio_orig; } ");
 //$("$image_p = imagecreatetruecolor($width, $height); $image = imagecreatefromjpeg($filename); ");
 //$("imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig); imagejpeg($image_p, null, 100); ?>");

}

if(_GET['photoid']&&_GET['albumid']){
 $pwa('<script type="text/javascript" src="http://picasaweb.google.com/data/feed/base/user/'+username+'/albumid/'+_GET['albumid']+'?category=photo&alt=json&callback=getphotolist"></script>');//get the list of photos in the album and put it in the global "photolist" array so we can properly display the navigation arrows; this eliminates the need for really long URLs :-) 7/16/2007
 $pwa('<script type="text/javascript" src="http://picasaweb.google.com/data/entry/base/user/'+username+'/albumid/'+_GET['albumid']+'/photoid/'+_GET['photoid']+'?alt=json&callback=photo"></script>');//photo
}else if(_GET['albumid']&&!_GET['photoid']){
 $pwa('<script type="text/javascript" src="http://picasaweb.google.com/data/feed/base/user/'+username+'/albumid/'+_GET['albumid']+'?category=photo&alt=json&callback=albums"></script>');//albums
}else{
 $pwa('<script type="text/javascript" src="http://picasaweb.google.com/data/feed/base/user/'+username+'?category=album&alt=json&callback=picasaweb&access=public"></script>');//picasaweb
}


//$Update: January 31, 2008$