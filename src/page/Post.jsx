import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import appwriteService from '../appwrite/config';
import { Button, Container } from '../components';

const Post = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug)
                .then((post) => {
                    if (post) setPost(post);
                    else navigate('/');
                });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id)
            .then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate('/');
                }
            });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center">
                    <div className="w-80 mb-4 relative border rounded-xl p-2">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl"
                        />

                        {isAuthor && (
                            <div className="absolute right-6 top-6">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" hoverColor='hover:bg-green-700' className="mr-3">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" hoverColor='hover:bg-red-700' onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full mb-6">
                    <h1 className="text-3xl font-black">{post.title}</h1>
                </div>
                <div className="text-left prose prose-slate prose-invert">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
};

export default Post;