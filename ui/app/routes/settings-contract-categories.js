import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  tinyData: service(),
  async beforeModel() {
    await this.tinyData.getCompetencyCategories();
  },
  model() {
    return this.tinyData.fetch('/api/categories?limit=-1');
  },
});
