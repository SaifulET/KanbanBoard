
import KanbanBoard from '../components/KanbanBoard';
import Navbar from '../components/Navbar';



const Home = () => {
 
    return (
    <div>
      
      {/* <div className="px-6 w-full min-h-screen  bg-gradient-to-b from-zinc-900 to-zinc-800 flex flex-col items-center justify-center"> */}
      <div className="px-6 w-full min-h-screen   bg-gradient-to-b from-zinc-900 to-zinc-800 grid grid-rows lg:grid-cols-12">
      <div className='mt-20 lg:col-span-10 mx-auto'><KanbanBoard/></div>
      <div className='h-30 lg:col-span-2 mt-40 mb-40'><Navbar/></div> 

    </div>
    </div>
    );
};

export default Home;