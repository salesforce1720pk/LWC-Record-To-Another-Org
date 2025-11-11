import { LightningElement, track } from 'lwc';
import insertAccount from '@salesforce/apex/integrationClass.insertAccount';
import accountGet from '@salesforce/apex/integrationClass.accountGet';

export default class IntegrationComponent extends LightningElement {

    @track selectedRating = '';
    @track selectedType = '';
    accountName = '';
    accountPhone = '';
    @track accountId;
    @track accountRecord = '';
    accountIds = '';

    get ratingOptions() {
        return [
            { label: 'Hot', value: 'Hot' },
            { label: 'Warm', value: 'Warm' },
            { label: 'Cold', value: 'Cold' }
        ];
    }

    get typeOptions() {
        return [
            { label: 'Prospect', value: 'Prospect' },
            { label: 'Customer - Direct', value: 'Customer - Direct' },
            { label: 'Customer - Channel', value: 'Customer - Channel' },
            { label: 'Channel Partner / Reseller', value: 'Channel Partner / Reseller' },
            { label: 'Installation Partner', value: 'Installation Partner' },
            { label: 'Technology Partner', value: 'Technology Partner' },
            { label: 'Other', value: 'Other' }
        ];
    }

    accNameHandler(event) {
        this.accountName = event.target.value;
    }

    handleRating(event) {
        this.selectedRating = event.target.value;
    }

    handleType(event) {
        this.selectedType = event.target.value;
    }

    accPhoneHandler(event) {
        this.accountPhone = event.target.value;
    }

    insertAccount() {
        insertAccount({
            name: this.accountName,
            type: this.selectedType,
            rating: this.selectedRating,
            phone: this.accountPhone
        })
        .then(() => {
            alert('Account sent to Org2 successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error sending account: ' + error.body.message);
        });
    }


    //Get Account
    getAccount(event){
        this.accountIds = event.target.value;
        
        accountGet({accIds: this.accountIds})
        .then(result =>{
            this.accountRecord = result;
        })
        .catch(error=>{
            this.accountRecord = null;
        })
    }
}
