
function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue;
}

function getCookie(cname) {
    if (get_Cookie(cname)) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return c;
    }
    else {
        return false
    }
}

function get_Cookie(name) {
    return document.cookie.split(';').some(c => {
        return c.trim().startsWith(name + '=');
    });
}

function deleteCookie(name) {
    if (get_Cookie(name)) {
        document.cookie = name+'=; Max-Age=-99999999;';
    }
}


function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay) ;
}

function sleepP(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

class fetcher{
    constructor(target, method, returnType=true, data=null){
        this.target = target;
        this.method = method;
        this.data = data;
        this.returnType = returnType;
    }

    static requestMaker(){

    }

    makeRequest(){
        this.requestObj = {credentials: 'include'};
        this.requestObj['method'] = this.method

        if (this.method === "POST") {
            this.requestObj["headers"] = {'Content-Type': 'application/json'};
        }
        else if (this.method === "GET") {
            this.data = null;
        }

        if (this.data !== null){
            this.requestObj['body'] = JSON.stringify(this.data);
        }

    }

    async getResource(){
        this.makeRequest();
        this.fetched = await fetch(this.target, this.requestObj);
        if (this.returnType === true) {
            if (this.fetched.ok === true) {
                let data = await this.fetched.json();
                return data
            }
            else {
                if (this.fetched.url !== this.target) {
                    this.target = this.fetched.url;
                    this.method = "GET";
                    this.makeRequest()

                    this.fetched = await fetch(this.target, this.requestObj)
                    if (this.fetched.ok === true) {
                        window.location.href = this.fetched.url;
                    }
                }
                else if (this.fetched.ok === false){
                    let data = await this.fetched.json();
                    alert(data);
                    }
            }
        }
        else if (this.returnType === "follow"){
            if (this.fetched.ok === true){
                window.location.href = this.fetched.url;
                return true
            }
            else if (this.fetched.url !== this.target){
                this.target = this.fetched.url;
                this.method = "GET";
                this.makeRequest()
                this.fetched = await fetch(this.target, this.requestObj)
                if (this.fetched.ok === true){
                    window.location.href = this.fetched.url;
                    return true
                }
            }
            else {
                let data = await this.fetched.json();
                return data
            }

        }

    }

}

function buildParamters(){
    var requestor = {};

}
