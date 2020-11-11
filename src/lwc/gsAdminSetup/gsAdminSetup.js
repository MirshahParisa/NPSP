import { LightningElement, track, wire } from 'lwc';
import gsAdminSetupTitle from '@salesforce/label/c.gsAdminSetupTitle';
import getChecklists from '@salesforce/apex/GS_AdminSetup.getChecklists';
import getLabelValue from 'c/gsLabelMapper';

/**
* @description This component renders all checklist sections and their steps
*/
export default class gsAdminSetup extends LightningElement {

    /**
    * @description A list of checklists to render
    */
    @track checklists;

    /**
    * @description Loads and translates all checklist sections and their items
    */
    @wire(getChecklists)
    wiredGetChecklist({ data, error }) {
        // Hold on to the provisioned value so we can refresh it later.
        if (data) {
            this.checklists = data.map(this.getLabelValueSection);
        }
    }

    /**
    * @description This method getLabelValue all text info in the checklist section and his items
    * @param ChecklistSection
    * @return ChecklistSection (getLabelValue)
    */
    getLabelValueSection = (section) => {
        const tSection = {...section}
        tSection.title = getLabelValue(section.title);
        tSection.description = getLabelValue(section.description);
        tSection.items = section.items.map(this.getLabelValueItem)
        return tSection
    }

    /**
    * @description This method getLabelValue all text info in checklist items
    * @param ChecklistItem
    * @return ChecklistItem (getLabelValue)
    */
    getLabelValueItem = (item) => {
        const tItem = {...item};
        tItem.title = getLabelValue(item.title);
        tItem.description = getLabelValue(item.description);
        tItem.extraInfo = getLabelValue(item.extraInfo);
        if (item.principalBtn) {
            tItem.principalBtn = {...(item.principalBtn)};
            tItem.principalBtn.label = getLabelValue(item.principalBtn.label);
        }
        if (item.secondaryBtn) {
            tItem.secondaryBtn = {...(item.secondaryBtn)};
            tItem.secondaryBtn.label = getLabelValue(item.secondaryBtn.label);
        }
        if (item.link) {
            tItem.link = {...(item.link)};
            tItem.link.label = getLabelValue(item.link.label);
        }
        return tItem;
    }

    /**
    * @description Return title to display in UI
    * @return      Title text
    * @see         labels
    */
    get title() {
        return gsAdminSetupTitle;
    }
}