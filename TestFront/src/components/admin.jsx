import React from 'react';
import EventTable from './EventTable';
import WorkshopTable from './WorkshopTable';
import HomeCardTable from './HomeCardTable';
import ContributorsTable from './ContributorsTable';
import ProjectCardsTable from './ProjectCardTable';
import TutorialsTable from './TutorialsTable';

const admin = () => {
    return (
        <div>
            <EventTable/>
            <WorkshopTable/>
            <HomeCardTable/>
            <ContributorsTable/>
            <ProjectCardsTable/>
            <TutorialsTable/>

                {/* FIXME: NAMING  */}
            
        </div>
    );
}

export default admin;
