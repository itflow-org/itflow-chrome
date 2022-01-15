# ITFlow Login Helper

## Short Description
Helps to fill login forms using the ITFlow login database.

## Description
ITFlow Login Helper is a login form filling browser extension for use in conjunction with the open source software "ITFlow". 
Users self-host the ITFlow application and configure the URL in the options. Once configured, just click the icon and the extension will fill a login form with the credentials (if found).

## Single Purpose
Retrieve credential data from the configured ITFlow URL and fill forms.

## Justifications
- Storage: To store the ITFlow URL. Otherwise we would have to prompt the user for their URL instance every time they want to load a password.

- Active Tab: To access/fill current tab.

- Scripting: To call the content.js when the user clicks on the icon via chrome.scripting.executeScript

- Remote Code: Remote data, not code. Credential data is retrieved from the URL the user specifies.