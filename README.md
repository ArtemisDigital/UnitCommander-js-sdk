
# UnitCommander Basic SDK

This package is a very simple package to help you get started with webhooks. This documentation will be guided towards UnitCommander Webhook events.

### Install

```
npm i @artemisdigital/unitcommander-sdk
```


## Examples


### Basic Webhook

This will launch a webhook listener 

```javascript
import { UnitCommanderWebhookService } from "@artemisdigital/unitcommander-sdk"

// This will initilize the service
const uc = new UnitCommanderWebhookService();

// Logs out the data from the webhook which is an object of `timestamp`, `data` and `type`
function logData(data) {
    console.log("Data from webhook: ", data);
}

// This will execute the function `logData` on a specific webhook type, you will need one of these for every event you would like to listen to see https://docs.unitcommander.co.uk/api/webhooks for more information
uc.webhookAddAction('profile.updated', logData);

// This will start the listener
uc.webhookListen(3000);
```

To run the above code, save it as `index.js` and run `node ./index.js` in the same directory as the file.


### Implement into Discord

In the following example, when the webhook `profile.updated.rank` is recieved, the function `giveRankToPlayer` will be exectued which will then send an API request to discord and give the player a specific role.

**Note the following code will NOT work, current API limitations will not let you get the discord ID of a user**

```javascript
import { UnitCommanderWebhookService } from "@artemisdigital/unitcommander-sdk";
import { axios } from "axios";

const uc = new UnitCommanderWebhookService();

// Don't store tokens in code, use environment variables or secrets
const discordBotToken = "TOKEN";

// You will need an API token to interact with the unitcommander API (it will need permission to see discord ids)
const unitCommanderBotId = "TOKEN"

// Your Discord GuildID
const guildID = "ID"

// You will want to map the name or abbreviation of the value to the Discord Id of the role (or rank id)
const ranks = {
    "Private": ROLE_ID_1,
    "Corporal": ROLE_ID_2
}

// This function can be more generalised, however for this example, its specific to adding a discord role to a Discord user
function giveRankToPlayer(data){
    const profileRank = ranks[data.rank.name] ? ranks[data.rank.name] : "GENERIC_ID"
    const playerId = data.id

    axios.get(`https://api.unitcommander.co.uk/community/YOUR_COMMUNITY_ID/profiles/${data.id}`, {
        "Authorization": `Bot ${unitCommanderBotId}`
    }).then(response => {
        response.json()
    }).then(data => {

        // Reference: https://discord.com/developers/docs/resources/guild#add-guild-member-role
        // Not all users have Discord linked, therefore this may error
        axios.put(`https://discord.com/api/10/guilds/${guildID}/members/${data.player.discord_id}/roles/${profileRank}`, {
            "Authorization": `Bot ${discordBotToken}`
        }).catch(error => {
            console.log(error)
        })
    })
};

uc.webhookAddAction('profile.updated.rank', logData);
uc.webhookListen(3000);
```
