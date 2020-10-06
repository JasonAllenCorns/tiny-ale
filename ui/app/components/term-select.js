import { computed } from '@ember/object';
import TSelect from './t-select';

export default TSelect.extend({
  optionsList: computed('terms', function () {
    return this.terms
      .sort((t1, t2) => {
        const year = t2.attributes.schoolYear - t1.attributes.schoolYear;
        if (year) {
          return year;
        }
        return t1.attributes.name.localeCompare(t2.attributes.name);
      })
      .map(term => ({
        name: term.attributes.name,
        value: term.id,
      }));
  }),
});
