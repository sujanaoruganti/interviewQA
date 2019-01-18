//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveQA);

//Save QA
function saveQA(e) {

    //get form values
    var question = document.getElementById('question').value;
    var answer = document.getElementById('answer').value;
    var source = document.getElementById('source').value;

    //Validate the form input
    if (!validateForm(question, answer, source)) {
        return false;
    }

    var qa = {
        que: question,
        ans: answer,
        src: source
    };

    //Local Storage Test
    //    localStorage.setItem('test', 'Hello World');
    //    console.log(localStorage.getItem('test'));
    //    localStorage.removeItem('test');
    //    console.log(localStorage.getItem('test'));

    //Test if QA is null
    if (localStorage.getItem('qaArray') === null) {
        //Init array
        var qaArray = [];

        //Add to array
        qaArray.push(qa);

        //Set to LocalStorage
        localStorage.setItem('qaArray', JSON.stringify(qaArray));
    } else {
        //get qas from Local storage
        var qaArray = JSON.parse(localStorage.getItem('qaArray'));

        //add the qa to the array
        qaArray.push(qa);

        //Re-Set to LocalStorage
        localStorage.setItem('qaArray', JSON.stringify(qaArray));

        //clear form
        document.getElementById('myForm').reset();

        //Re-fetch QA
        fetchQAs();

    }

    //Prevent form from submitting
    e.preventDefault();
}

function deleteQA(src) {
    //get bookmarks from local storage
    var qaArray = JSON.parse(localStorage.getItem('qaArray'));

    //loop throughout qaArray
    for (var i = 0; i < qaArray.length; i++) {
        if (qaArray[i].src == src) {
            //remove from array
            qaArray.splice(i, 1);
        }
    }

    //Re-Set to LocalStorage
    localStorage.setItem('qaArray', JSON.stringify(qaArray));

    //Re-fetch QA
    fetchQAs();
}



//Fetch QAs
function fetchQAs() {
    //get qas from Local storage
    var qaArray = JSON.parse(localStorage.getItem('qaArray'));

    //Get output ID
    var qaResults = document.getElementById('qaResults');

    //Build Output
    qaResults.innerHTML = '';
    for (var i = 0; i < qaArray.length; i++) {
        var que = qaArray[i].que;
        var ans = qaArray[i].ans;
        var src = qaArray[i].src;

        qaResults.innerHTML += '<div class="well">' +
            '<h3>' + que + '</h3>' +
            '<p>' + ans + '</p></br>' +
            ' <a class="btn btn-default" target="_blank" href="' + src + '"> Source</a> ' +
            ' <a onclick="deleteQA(\'' + src + '\')" class="btn btn-danger" href="#"> Delete</a> '
        '</div>';
    }
}

function validateForm(question, answer, source) {
    if (!question || !answer || !source) {
        alert('Please fill in the form');
        return false;
    }

    //Validate the URL entered using a regex
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    //Check the URL against RegEx
    if (!source.match(regex)) {
        alert('Enter a valid URl');
        return false;
    }

    return true;
}
