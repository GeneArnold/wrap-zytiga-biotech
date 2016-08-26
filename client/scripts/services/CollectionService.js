import Constants from '../constants';
import AngularBaseClass from '../angularBaseClass';

class CollectionService extends AngularBaseClass {
  constructor($http) {
    super(arguments);
  }

  getCardsInCollection() {
    const cardCollectionId = Constants.collectionId;

    const getOptions = {
      method: 'GET',
      url: `https://api.wrap.co/api/cards/collections/search?card_collection_ids=${cardCollectionId}`,
      headers: {
        Authorization: `Bearer ${Constants.WRAP_API_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    return this.$http(getOptions)
      .then(cards => cards.data)
      .catch(err => {
        console.log('Error');
        console.log(err.message);
      });
  }
}

CollectionService.$inject = ['$http'];
export default CollectionService;
