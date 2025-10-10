import ActivityService from "../services/activity.service";
import { Link, useNavigate } from "react-router";
import swal from "sweetalert2"

const ActivityCard = ({ activity, fetchData }) => {
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const navigate = useNavigate();

  const handleDelete = async (id) => {
    const result = await swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
    // .then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        const response = await ActivityService.deleteActivityById(id);
        fetchData();

        if(response.status === 200) {
          navigate(`/`);
        }
        return response;
      }
    // });
  };


  return (
    <div
      className="card bg-base-100 shadow-md border border-base-300"
      key={activity.id}
    >
      <div className="card-body">
        <h2 className="card-title text-primary">{activity.name}</h2>
        <p>{activity.description}</p>

        <div className="mt-4 space-y-1 text-sm">
          <p>
            <strong>ประเภทกิจกรรม:</strong>{" "}
            {activity.type === "competition" ? "การแข่งขัน" : activity.type}
          </p>
          <p>
            <strong>ระดับ:</strong> {activity.level}
          </p>
          <p>
            <strong>จำนวนคนต่อทีม:</strong> {activity.team_size} คน
          </p>
          <p>
            <strong>วันที่แข่งขัน:</strong> {formatDate(activity.date)}
          </p>
          <p>
            <strong>สถานที่:</strong> {activity.location}
          </p>
          <p>
            <strong>รับสมัคร:</strong> {formatDate(activity.reg_open)} –{" "}
            {formatDate(activity.reg_close)}
          </p>
          <p>
            <strong>สถานะ:</strong>{" "}
            <span
              className={`font-bold ${
                activity.status === "open" ? "text-green-600" : "text-red-500"
              }`}
            >
              {activity.status === "open" ? "เปิดรับสมัคร" : "ปิดรับสมัคร"}
            </span>
          </p>
        </div>

        <div className="divider"></div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <p>
              <strong>ติดต่อ:</strong> {activity.contact_name}
            </p>
            <p>📞 {activity.contact_phone}</p>
            <p>
              ✉️{" "}
              <a
                href={`mailto:${activity.contact_email}`}
                className="text-blue-600 underline"
              >
                {activity.contact_email}
              </a>
            </p>
          </div>
            <div className="flex justify-end gap-5">
              <Link to={`/update/${activity.id}`} className="btn btn-warning">
                  Edit
                </Link>
              <button
                  onClick={() => handleDelete(activity.id)}
                  className="btn btn-error"
                >
                  Delete
                </button>
                
            </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
