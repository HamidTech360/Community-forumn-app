import Head from "next/head";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Comment from "../../components/Organisms/App/Comment";
import Contributors from "../../components/Organisms/Gist/Contributors";
import GistCard from "../../components/Organisms/Gist/GistCard";
import styles from '@/styles/gist.module.scss';
const Gist = ({
  gist,
  replies,
  contributors,
}: {
  gist: Record<string, any>;
  replies: Record<string, any>[];
  contributors: { name: string; avatar: string }[];
}) => {
  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";
    console.log(replies);
    return () => {
      document.body.style.backgroundColor = "initial";
    };
  });

  return (
    <Container>
      <Head>
        <title>{gist?.title.raw.replace("&amp;", "&")}</title>
      </Head>

      <Row>
        <Col md={4} className="desktop-only">
          <Contributors contributors={contributors} />
        </Col>
        <Col md={8}>
          <GistCard gist={gist} primary />
          <h5 className={`px-2 m-2 ${styles.comment}`}>Comments({replies?.length || "0"})</h5>
          <div className="mt-2">
            {replies?.map((reply, key) => (
              <Comment comment={reply} key={`comment-${key}`} />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export async function getStaticPaths() {
  const ids = await fetch(`${process.env.REST}/buddyboss/v1/topics?_fields=id`);

  let paths = await ids.json();
  paths = paths.map((id: Record<string, any>) => {
    return {
      params: {
        id: id.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps = async ({
  params,
}: {
  params: Partial<Record<string, string>>;
}) => {
  const gist = await (
    await fetch(
      `${process.env.REST}/buddyboss/v1/topics/${params.id}?_embed=user`,
      {
        method: "GET",
      }
    )
  ).json();

  let replies: Record<string, any>[] = await (
    await fetch(
      `${process.env.REST}/buddyboss/v1/reply?parent=${params.id}&per_page=10&_embed=user&_fields=_links,_embedded,link,id,date,content`
    )
  ).json();

  let contributors = [
    {
      name: gist._embedded.user[0].name,
      avatar: gist?._embedded?.user[0]?.avatar_urls.full,
    },
  ];

  replies.forEach((reply) => {
    const newReply = JSON.stringify({
      name: reply?._embedded?.user[0].name,
      avatar:
        reply?._embedded?.user[0]?.avatar_urls?.full || "/images/formbg.png",
    });

    if (!contributors.find(({ name }) => name === JSON.parse(newReply).name)) {
      contributors.push(JSON.parse(newReply));
    }
  });

  return {
    props: {
      gist,
      replies,
      contributors,
    },
  };
};
export default Gist;
