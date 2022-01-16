let environment: string = "dev";

let serverURLs: any = {
    "dev": {
        "NODE_SERVER": "http://localhost",
        "NODE_SERVER_PORT": "4000",
        "LDAP_URL":"ldap://10.49.99.11",
        "BASE_DN":"DC=ap,DC=didata,DC=local",
    },
    "production": {
        "NODE_SERVER": "http://11.11.11.11",
        "NODE_SERVER_PORT": "4000",
    }

}

let config = {
    "NODE_SERVER_PORT": {
        "port": `${serverURLs[environment].NODE_SERVER_PORT}`
    },
    "NODE_SERVER_URL": {
        "url": `${serverURLs[environment].NODE_SERVER}`
    },
    "LDAP_URL":{
        "url": `${serverURLs[environment].LDAP_URL}`
    },
    "BASE_DN":{
        "baseDN": `${serverURLs[environment].BASE_DN}`
    }
};

module.exports = {
    config: config
};
