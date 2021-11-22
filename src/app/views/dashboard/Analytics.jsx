import React, { Fragment } from 'react'
import { Grid, Card } from '@material-ui/core'
import DoughnutChart from './shared/Doughnut'
import StatCards from './shared/StatCards'
import TopSellingTable from './shared/TopSellingTable'
import RowCards from './shared/RowCards'
import StatCards2 from './shared/StatCards2'
import UpgradeCard from './shared/UpgradeCard'
import Campaigns from './shared/Campaigns'
import { useTheme } from '@material-ui/styles'
import { Breadcrumb, SimpleCard } from 'app/components'
const Analytics = () => {
    const theme = useTheme()

    return (
        <Fragment>
            <div className="analytics m-sm-30 mt-6">

                <SimpleCard title="Bienvenido">
                    <p className="m-0">
                        <code>Utilitarios Clínica Arequipa</code>
                    </p>

                    <div>
                        <img src="https://www.clinicarequipa.com.pe/wp-content/uploads/2019/02/51518371_622726551489824_2879357276513107968_n.png" width="350px"></img>
                    </div>


                </SimpleCard>

                {/* <Grid container spacing={3}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <StatCards />

            
                        <TopSellingTable />

                        <StatCards2 />

                        <h4 className="card-title text-muted mb-4">
                            Ongoing Projects
                        </h4>
                        <RowCards />
                    </Grid>

                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Card className="px-6 py-4 mb-6">
                            <div className="card-title">Traffic Sources</div>
                            <div className="card-subtitle">Last 30 days</div>
                            <DoughnutChart
                                height="300px"
                                color={[
                                    theme.palette.primary.dark,
                                    theme.palette.primary.main,
                                    theme.palette.primary.light,
                                ]}
                            />
                        </Card>

                        <UpgradeCard />

                        <Campaigns />
                    </Grid>
                </Grid> */}
            </div>
        </Fragment>
    )
}

export default Analytics
