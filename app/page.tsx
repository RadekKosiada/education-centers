
export default async function Home() {
    const URL = "https://www.vhsit.berlin.de/VHSKURSE/OpenData/Kurse.json";
    const data = await fetch(URL);
    const courses = await data.json();
    console.log('COURSES: ', courses);
    
    return (
        <div className="">
            <main className="">
                <h1>Hello World</h1>
            </main>
        </div>
    );
}
