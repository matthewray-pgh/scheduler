import React from 'react';

import '../styles/ListLayout.scss';

export const ListLayout = ({
  listComponent: ListComponent, 
  formComponent: FormComponent,
  showForm
}) => {
  
  return (
    <div className="list-layout">
      <section className="list-layout__list-view">
        <ListComponent />
      </section>
      <section className="list-layout__form-view">
        <div className={showForm 
          ? "list-layout__form-view--show" 
          : "list-layout__form-view--hide"} >
          <FormComponent />
        </div>
      </section>
    </div>
  );
}