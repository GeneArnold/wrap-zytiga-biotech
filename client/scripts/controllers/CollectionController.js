import AngularBaseClass from '../angularBaseClass';
import Constants from '../constants';
import _ from 'lodash';

class CollectionController extends AngularBaseClass {
  constructor(CollectionService, WrapService) {
    super(arguments);

    this.topics = WrapService.getTopics();
  }

  toggleSelection(topicSelection, event) {
    this.WrapService.toggleTopicSelection(topicSelection);
    event.preventDefault();
    event.stopPropagation();

    return false;
  }

  getImageUrlForCard(card, mobile) {
    let mobilePath = mobile ? '/mobile' : '';

    return `images${mobilePath}/${card.image}.jpg`;
  }

  isActiveClass(card) {
    return {
      "activeTopic": !this.WrapService.isActiveTopic(card)
    };
  }

  getIconUrlForCard(card) {
    return `images/${card.icon}.png`;
  }

  getDescriptionForCard(card) {
    return card.description;
  }

  getTitleForCard(card) {
    return card.title;
  }
}

CollectionController.$inject = ['CollectionService', 'WrapService'];
export default CollectionController;
