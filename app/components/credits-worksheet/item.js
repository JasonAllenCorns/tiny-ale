import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import CreditAssignmentPropsMixin from '../../mixins/credit-assignment-props';

export default Component.extend(CreditAssignmentPropsMixin, {
  tinyData: service(),
  tagName: '',
  selected: false,

  selectionDisabled: computed('disabled', 'hasChildren', function () {
    if (this.disabled) {
      return true;
    }

    return this.hasChildren;
  }),

  showSplit: computed('hasChildren', function () {
    return this.hasChildren;
  }),

  showApproveForTransmittal: computed('creditAssignment', function () {
    return true;
  }),

  actions: {
    approveCredit() {
      this.approveCredit(this.creditAssignment);
    },
    splitCredit() {
      this.splitCredit(this.creditAssignment);
    },
    selectCredit() {
      this.toggleProperty('selected');
      this.selectCredit(this.creditAssignment, this.selected);
    },
  },
});
