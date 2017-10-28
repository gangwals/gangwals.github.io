/** 
 * This is the script to check the subscription status and send a welcome notification 
 * to the current subscriber.
 * @author Saurabh G (saurabh.gangwal@wingify.com)
 */

//Get the cookie value to check the addition of subscriber in the segment 
var re = new RegExp("segmentIndicator" + "=([^;]+)");
var value = re.exec(document.cookie);

if (value == null) {

    /**
     * Create a callback on successful subscription.
     *
     * @param {String} subscriptionSuccessCallback The authorization for a successful subscription.
     * @param {function} callbackOnSuccessfulSubscription The callback to call on successful
     * subscription of the subscriber.
     */

    _pcq.push(['subscriptionSuccessCallback', callbackOnSuccessfulSubscription]);

    function callbackOnSuccessfulSubscription() {
        //console.log("callbackOnSuccessfulSubscription");
        addToSegment();
        sendNotification();
    }

    /**
     * Create a callback if the subscriber is already subscribed and PushCrew API is ready.
     *
     * @param {String} APIReady The authorization for PushCrew API Ready.
     * @param {function} callbackFunction The callback to call when PushCrew API is ready.
     */

    _pcq.push(['APIReady', callbackFunction]);

    function callbackFunction() {
        if (pushcrew.subscriberId) {
            //console.log("callbackFunction");
            addToSegment();
            sendNotification();
        }
    }
}

//Add the subscriber to desired segment and define the segment cookie

function addToSegment() {

    /**
     * Create a callback to add the subscriber in a desired segment.
     *
     * @param {String} addSubscriberToSegment The authorization for adding subscriber to a segment.
     * @param {String} enGB The desired segment name (no spaces, no special characters).
     * @param {function} callbackForAddToSegment The callback to call on addition of subscriber to the segment.
     */

    _pcq.push(['addSubscriberToSegment', 'enGB', callbackForAddToSegment]);

    function callbackForAddToSegment() {
        //console.log('added to segment!');
        document.cookie = 'segmentIndicator=' + true;
    }
}

//Send the welcome push notification to a particular subscriber

function sendNotification() {
    $.ajax({
        url: 'SendIndividualNotification.php',
        method: 'POST',
        data: {
            subscriber: pushcrew.subscriberId
        },
        success: function(data) {
            //console.log("success");
        },
        error: function(data) {
            console.log("error");
        }
    });
}