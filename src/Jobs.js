const Jobs = ({ degree, location, data }) => {
    if (!data || data.length === 0) {
        return <div>No jobs available</div>;
    }

    const handleApply = () => {
        window.location.href = data[0].job_url;
    };

    return (
        <div>
            <h1>Test Jobs</h1>
            <p>Job: {data[0].job}</p>
            <p>Job Company: {data[0].job_company}</p>
            <p>Job Desc: {data[0].job_desc}</p>
            <p>Job Qual: {data[0].job_qual}</p>
            <button onClick={handleApply}>Apply</button>
        </div>
    );
};

export default Jobs;