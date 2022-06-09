import CategoryItem from '../category-item/category-item.component';

import './directory.styles.scss';

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {/* data mapping */}
      {categories.map((category) => (
        //paste the component with props from data
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  );
};

export default Directory;
