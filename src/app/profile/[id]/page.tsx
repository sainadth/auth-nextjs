export default function userProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile Page
        <span className="m-2 p-2 bg-orange-500 rounded text-black">
          {params.id}
        </span>
      </p>
    </div>
  );
}
