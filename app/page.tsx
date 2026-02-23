import { loadCourses } from "./lib/load-courses";

export const getStaticProps = async(context) => {
    try {
        const courses = await loadCourses(context);

        if(!courses) {
            return {
                notFound: true
            }
        }

        return {
            props: {
                courses,
            },
            revalidate: 3600
        }
    } catch(error) {
        logger.error(`Error fetch current courses: ${error}`);
        throw error;
    }
    // https://nextjs.org/docs/app/getting-started/error-handling
    // https://nextjs.org/docs/app/getting-started/error-handling#not-found
    // https://www.telerik.com/blogs/understand-error-handling-modern-next-js
    // https://www.youtube.com/watch?v=Eywzqiv29Zk

}

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
