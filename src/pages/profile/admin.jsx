export default function AdminProfile() {
  return (
    <div className="my-10">
      <div className="card w-full bg-base-100 card-xs shadow-sm">
        <div className="card-body p-4">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold">Admin Account</h1>
                <p className="text-lg">Admin</p>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
