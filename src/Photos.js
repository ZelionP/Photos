const Photos = ({
    urls: {regular},
    alt_description,
    likes,
    user:{
        name,
        portfolio_url,
        profile_image:{medium}
    }
}) =>{
    return (
        <article className="photo">
            <img src={regular} alt={alt_description} />
            <div className="photoInfo">
                <div>
                   <h4>{name}</h4>
                <p>{likes} Likes</p> 
                </div>
                <a href={portfolio_url}><img src={medium} alt={name} className="userImg" /></a>

            </div>
        </article>
    );
}
export default Photos