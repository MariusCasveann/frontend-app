import { ResourceConsumption_resourceConsumption } from '../../CpuUtilization/qraphql/__generated__/resourceConsumption';
import { buildChartData, formatLabels } from '../DeploymentFrequencyWidget';
import { buildDataExpectedEmptyResults } from '../../../../common/mock/MockData';

const mockData: ResourceConsumption_resourceConsumption[] = [
    {
        projectId: 'domain 1',
        usage: '1',
        resourceType: 'domain',
        usageDate: 'usage',
        __typename: 'ResourceConsumptionDTO'
    },
    {
        projectId: 'domain 2',
        usage: '3',
        resourceType: 'domain',
        usageDate: 'usage',
        __typename: 'ResourceConsumptionDTO'
    },
    {
        projectId: 'domain 3',
        usage: '5',
        resourceType: 'domain',
        usageDate: 'usage',
        __typename: 'ResourceConsumptionDTO'
    }
];

const mockDataEmpty: ResourceConsumption_resourceConsumption[] = [];

const buildDataExpectedResults = {
    labels: ['domain 1', 'domain 2', 'domain 3'],
    datasets: [
        {
            data: [1, 3, 5]
        }
    ]
};

const formattedLabels = ['domain 1 (1)', 'domain 2 (3)', 'domain 3 (5)'];

describe('when `buildChartData` is called', () => {
    it('should return the correct result', () => {
        expect(buildChartData(mockData)).toMatchObject(buildDataExpectedResults);
    });

    it('should return the empty result', () => {
        expect(buildChartData(mockDataEmpty)).toMatchObject(buildDataExpectedEmptyResults);
    });
});

describe('formatLabels', () => {
    it('should return the correct result', () => {
        expect(formatLabels(mockData)).toMatchObject(formattedLabels);
    });
});
