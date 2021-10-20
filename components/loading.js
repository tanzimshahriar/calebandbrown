export default function Loading() {
    return (
        <div
            className="text-white font-thin fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-evening opacity-50 flex flex-col items-center justify-center"
        >
            <div
                className="loader ease-linear rounded-full border-4 border-t-4 border-aqua h-12 w-12 mb-4"
            ></div>
            <h2 className="text-center text-white text-xl">Loading...</h2>
        </div>
    )
}