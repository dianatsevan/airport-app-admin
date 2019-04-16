import React from 'react';
import AddAirportForm from './add-airport';
import AirportsList from './airports-list';

function AirportPage() {
  return (
    <section className="airport-page">
      <AddAirportForm />
      <AirportsList />
    </section>
  );
}

export default AirportPage;
