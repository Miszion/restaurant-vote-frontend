import React from 'react'
export default function FadeInSection(props) {
    const [isVisible, setVisible] = React.useState(true)
    const [isVotes, setVotes] = React.useState(false)
    const [numVotes, setNumberOfVotes] = React.useState(0)
    const domRef = React.useRef();
    React.useEffect( () => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
        return () => observer.unobserve(domRef.current);
    }, []);

return  (
        <div className={`food-info-block ${isVisible ? 'is-visible': ''}`} ref={domRef} onClick={

            () => {
                fetch(`http://localhost:3001/addvote/${props.id}`, {
                    method: 'get',
                    headers: {'Content-type': 'application/json'}
                }).then(res => res.json()).then( (result) =>
                    
                    fetch(`http://localhost:3001/votes/${props.id}`, {
                        method: 'get',
                        headers: {'Content-type': 'application/json'}
                    }).then(res => res.json()).then( (result) => {
                        
                        setNumberOfVotes(result[0].numVotes);
                        setVotes(true);

                    })


                )
            }

        }>
        <div className={`vote-display ${isVotes ? 'votes-visible' : ''}`}>
            <div className='voted-headline'>
                Thank you for voting!
            </div>
            <div className='voted-information'>
                This product currently has {numVotes}!
            </div>
        </div>
          {props.children}
        </div>
);
}