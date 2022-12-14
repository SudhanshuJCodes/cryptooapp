import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbGdFMWlHenVTendqV25vajJtOW0tb2F5OGI5d3xBQ3Jtc0trZTNoX1pwNGd2enlvWGR2cm1DdndFWUNLV2V0bDFwZktBbks5NC1wRUZkUEhxNTluM0ZtTVNHalBXV21lcTFkREpaajBJT2pzNWpyblhxQlAyZ3c0Wml4bWk1T1NuRmFRSWhkZlQtUDdza1FCenAwRQ&q=https%3A%2F%2Fwww.bing.com%2Fth%3Fid%3DOVFT.mpzuVZnv8dwIMRfQGPbOPC%26pid%3DNews&v=9DDX3US3kss'


const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data } = useGetCryptosQuery(100);
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });

    if (!cryptoNews?.value) return 'Loading...';

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select showSearch className='select-news' placeholder='Select a Crypto' optionFilterProp='children' onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase())}
                    >
                        <Option value='Cryptocurrency'>Cryptocurrency</Option>
                        {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
                    </Select>
                </Col>
            )}
            {cryptoNews.value.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card>
                        <a href={news.url} target="_blank" rel='noreferrer'>
                            <div className='news-image-container'>
                                <Title className='news-title' level={4}>{news.name}</Title>
                                <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt='news' />
                            </div>
                            <p>
                                {news.description > 100 ? `${news.description.substring(0, 100)}...`
                                    : news.description
                                }
                            </p>
                            <div className='provider-container'>
                                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='news' />
                                <Text className='provider-name'>{news.provider[0]?.name}</Text>

                            </div>
                            <Text>
                                {moment(news.datePublished).startOf('ss').fromNow()}
                            </Text>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News;
