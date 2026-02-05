type Props = {
    title: string;
    value: string | number;
};

const DashboardCard: React.FC<Props> = ({ title, value }) => (
    <div className="col-md-4 mb-4">
        <div
            className="card rounded-4 shadow-sm"
            style={{ border: "1px solid #0973d7ff" }}
        >
            <div className="card-body">
                <small className="text-muted">{title}</small>
                <h3 className="fw-bold mt-2">{value}</h3>
            </div>
        </div>
    </div>    
);

export default DashboardCard;
