import JobSearchView from './JobSearch.view';

export default function JobSearch() {
    return (
        <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', width: '55%', marginTop: '25%', marginLeft: '0.8%' }}>
            <JobSearchView />
        </div>
    )
}